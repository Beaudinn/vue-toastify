<template>


    <component
        :is="tag"
        v-bind="urlTarget"
        class="vt-notification max-w-sm w-full bg-white dark:bg-cool-gray-700 dark:text-blue-700 shadow-lg m-1 rounded-lg pointer-events-auto"
        :style="draggableStyles"
        :class="notificationClass"
        draggable="false"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @touchstart="isHovered = true"
        @touchend="isHovered = false"
    >


<!--  overflow-hidden -->
    <div  :class="{'flex' : status.mode === 'split-prompt'}" class="rounded-lg shadow-xs">

      <div :class="{'w-0 flex-1' : status.mode === 'split-prompt'}" class=" p-4">
        <ProgressBar
            v-if="isNotification && status.canTimeout"
            :can-pause="status.canPause"
            :duration="status.duration"
            :is-hovered="isHovered"
            :hide-progressbar="status.hideProgressbar"
            :id="status.id"
            :ref="'progress-' + status.id"
            @vtFinished="closeNotification"
        />
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5" v-if="status.mode !== 'condensed' && status.image" >
            <img class="h-10 w-10 rounded-full" :src="status.image" alt="" />
          </div>
          <Icon
              v-if="status.iconEnabled && !status.image"
              :mode="status.mode"
              :type="status.type"
              :icon="status.icon"
              :base-icon-class="baseIconClass"
          />
          <div class="w-0 flex-1 flex justify-between" v-if="status.mode === 'condensed'" >
            <p class="w-0 flex-1 text-sm leading-5 font-medium text-gray-900" v-html="status.body"></p>
            <button v-for="(value, answerProperty, index) in status.answers"
            :key="index"
            @click="respond(value)"
            v-text="answerProperty"
            class="ml-3 flex-shrink-0 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"/>
          </div>
          <div v-else class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm leading-5 font-medium text-gray-900 dark:text-cool-gray-50" v-if="status.title" v-text="status.title">
            </p>
            <p class="mt-1 text-sm leading-5 text-gray-500 dark:text-cool-gray-100" v-html="status.body">

            </p>
            <div v-if="status.mode === 'prompt'" class="mt-4 flex">
             <span class="inline-flex rounded-md shadow-sm" v-for="(value, answerProperty, index) in status.answers" :key="index">
               <button :class="{ 'ml-3': index !== 0 }" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
               @click="respond(value)"
               v-text="answerProperty"
               />
             </span>
           </div>
          </div>
          <div v-if="status.mode !== 'loader' && status.mode !== 'split-prompt'" class="ml-4 flex-shrink-0 flex">
            <button @click.stop="closeNotification()" class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex border-l border-gray-200" v-if="status.mode === 'split-prompt'">
        <!-- <button v-if="Object.keys(status.answers).length == 1"
        class="-ml-px flex items-center justify-center w-full border border-transparent rounded-r-lg p-4 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50 transition ease-in-out duration-150">
          Reply
        </button> -->
        <div class="-ml-px flex flex-col">
          <div v-for="(value, answerProperty, index) in status.answers" :key="index"
          class="h-0 flex-1 flex border-b border-gray-200"
          :class="{ 'h-0 flex-1 flex border-b border-gray-200': index == 0, '-mt-px h-0 flex-1 flex': index != 0 }" >
            <button
            class="-mb-px flex items-center justify-center w-full rounded-tr-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50 transition ease-in-out duration-150"
            @click="respond(value)"
            v-text="answerProperty"/>
          </div>
        </div>
      </div>


    </div>
    </component>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";
import Icon from "./Icon.vue";
import draggable from "./draggable.js";
import linkable from "./linkable";

export default {
    name: "Toast",
    components: { ProgressBar, Icon },
    props: {
        status: { type: Object },
        baseIconClass: { type: String, default: "" }
    },
    mixins: [draggable, linkable],
    data() {
        return {
            isHovered: false
        };
    },
    mounted() {
        this.$el.addEventListener("click", this.dismiss);
        if (this.status.mode === "loader") {
            this.$root.$once("vtLoadStop", payload => {
                //if all loaders should stop or only this
                if (payload.id) {
                    if (payload.id === this.status.id) {
                        this.closeNotification();
                    }
                } else {
                    this.closeNotification();
                }
            });
        }
    },
    computed: {
        notificationClass() {
            let obj = {};
            if (this.hasUrl) {
                obj["cursor-pointer"] = true;
            } else if (this.status.mode === "loader") {
                obj["cursor-wait"] = true;
            }

            return obj;
        },
        isNotification() {
            return ["prompt", "loader", "condensed", "split-prompt"].indexOf(this.status.mode) === -1;
        }
    },
    methods: {
        closeNotification() {
            const progress = Math.ceil(
                this.$refs["progress-" + this.status.id]
                    ? this.$refs["progress-" + this.status.id].progress
                    : undefined
            );

            // if notification manually dismissed before the the timeout or in case if it cannot timeout AND isn't prompt or loader
            if ((isNaN(progress) || progress < 100) && this.isNotification) {
                this.$root.$emit("vtDismissed", { id: this.status.id,  status: this.status });
                this.status.callback ? this.status.callback() : null;
            }
            // if the notification has finished displaying
            if (progress >= 100 && this.isNotification) {
                this.$root.$emit("vtFinished", { id: this.status.id, status: this.status });
                this.status.callback ? this.status.callback() : null;
            }
        },
        dismiss(event) {
            if (this.isNotification && !this.hasMoved) {
                this.closeNotification();
            }
            this.handleRedirect(event);
        },
        respond(response) {
            this.closeNotification();
            this.$root.$emit("vtPromptResponse", {
                id: this.status.id,
                response: response
            });
        }
    },
    beforeDestroy() {
        this.$el.removeEventListener("click", this.dismiss);
    }
};
</script>
