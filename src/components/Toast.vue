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
    <div class="rounded-lg shadow-xs overflow-hidden">
      <div class="p-4">
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
          <Icon
              v-if="status.iconEnabled"
              :mode="status.mode"
              :type="status.type"
              :icon="status.icon"
              :base-icon-class="baseIconClass"
          />
          <div class="ml-3 w-0 flex-1 pt-0.5">
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
          <div v-if="status.mode !== 'loader'" class="ml-4 flex-shrink-0 flex">
            <button class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
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
            return ["prompt", "loader"].indexOf(this.status.mode) === -1;
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
                this.$root.$emit("vtDismissed", { id: this.status.id });
                this.status.callback ? this.status.callback() : null;
            }
            // if the notification has finished displaying
            if (progress >= 100 && this.isNotification) {
                this.$root.$emit("vtFinished", { id: this.status.id });
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
