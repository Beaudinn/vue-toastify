<template>
    <div class="flex-shrink-0">
        <component
            v-if="userIcon"
            :is="userIcon.tag"
            :class="userIcon.class"
            v-html="userIcon.ligature"
        />
        <div v-else-if="mode === 'loader'" >
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6 text-gray-400 spinner">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div v-else-if="mode === 'prompt'" >
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6 text-gray-400">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
          </svg>

        </div>
        <div v-else-if="containerClasses['vt-success']">
          <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div v-else-if="containerClasses['vt-error']">
          <svg class="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div v-else-if="containerClasses['vt-warning']">
          <svg class="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
             <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
           </svg>
        </div>
        <div v-else-if="containerClasses['vt-info']">
          <svg class="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
           <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
         </svg>
        </div>
    </div>
</template>

<script>
import { isString, isObject } from "../js/utils";
export default {
    name: "Icon",
    props: {
        mode: { type: String },
        type: { type: String },
        icon: { type: [Object, String] },
        baseIconClass: { type: String, default: "" }
    },
    computed: {
        userIcon() {
            if (!this.icon) {
                return false;
            }
            let icon = {
                tag: "i",
                ligature: "",
                class: this.baseIconClass
            };
            if (isString(this.icon)) {
                if (this.icon.toLowerCase().includes("<svg")) {
                    icon.tag = "div";
                    icon.ligature = this.icon;
                } else {
                    icon.class = icon.class + " " + this.icon;
                }
            }
            if (isObject(this.icon)) {
                icon = Object.assign(icon, this.icon);
            }
            return icon;
        },
        containerClasses() {
            let obj = {};
            if (this.mode !== "loader") {
                obj["vt-circle"] = !this.icon;
            }
            obj["vt-prompt"] = this.mode === "prompt";
            if (this.mode === undefined || this.mode.length === 0) {
                obj["vt-" + (this.type ? this.type : "info")] = true;
            }

            return obj;
        }
    }
};
</script>
