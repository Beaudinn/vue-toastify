<template>
  <div class="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
  <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  <div class="max-w-3xl mx-auto">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">By Beaudinn Greve</p>
        <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Vue Tailwindui Toastify
        </h3>
        <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
          A fuss free notification component.
        </p>
      </div>
    </div>
  </div>


        <main class="px-2 mt-10">
            <div
                class="flex xl:justify-center justify-around flex-wrap flex-row"
            >
                <div class="flex flex-col w-auto sm:max-w-50 sm:mr-2">
                    <div
                        class="font-mono border-gray-200 bg-gray-800 text-gray-400 p-5 rounded-lg shadow-xl mx-auto max-w-md mb-8 break-words"
                    >
                        <p>status: {</p>
                        <p class="ml-8" v-if="status.title">
                            title: "<span v-text="status.title"></span>",
                        </p>
                        <p class="ml-8">
                            body: "<span v-text="status.body"></span
                            ><span>"</span>
                            <span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.defaultTitle ||
                                        status.canTimeout ||
                                        status.canPause ||
                                        status.type ||
                                        status.mode ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.type">
                            type: "<span v-text="status.type">success</span
                            ><span>"</span>
                            <span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.defaultTitle ||
                                        status.canTimeout ||
                                        status.canPause ||
                                        status.mode ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.canPause">
                            canPause: <span v-text="status.canPause"></span>
                            <span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.defaultTitle ||
                                        status.canTimeout ||
                                        status.mode ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.canTimeout">
                            canTimeout: <span v-text="status.canTimeout"></span>
                            <span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.defaultTitle ||
                                        status.mode ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.defaultTitle">
                            defaultTitle:
                            <span v-text="status.defaultTitle"></span
                            ><span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.mode ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.mode">
                            mode: "<span v-text="status.mode"></span
                            ><span>"</span
                            ><span
                                v-if="
                                    status.duration ||
                                        status.icon ||
                                        status.answers ||
                                        status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.answers">
                            answers: <span v-text="status.answers"></span
                            ><span
                                v-if="
                                    status.duration || status.icon || status.url
                                "
                                >,</span
                            >
                        </p>
                        <p class="ml-8" v-if="status.duration">
                            duration:
                            <span v-text="status.duration"></span>
                            <span v-if="status.icon || status.url">,</span>
                        </p>
                        <p v-if="status.icon" class="ml-8">
                            icon: "<span v-text="status.icon"></span
                            ><span>"</span>
                            <span v-if="status.url">,</span>
                        </p>
                        <p v-if="status.url" class="ml-8">
                            url: "<span v-text="status.url"></span
                            ><span>"</span>
                        </p>
                        <p>}</p>
                    </div>
                    <div class="w-full mx-auto">
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                        >
                            <label for="title">Title:</label>
                            <input
                                type="text"
                                v-model="status.title"
                                class="input w-3/4 sm:w-2/3 md:w-4/5"
                                id="title"
                            />
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                        >
                            <label for="body">Body:</label>
                            <textarea
                                id="body"
                                class="input w-3/4 sm:w-2/3 md:w-4/5"
                                v-model="status.body"
                                placeholder="Html is also accepted."
                                :class="{ invalid: status.body < 1 }"
                            ></textarea>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                        >
                            <label for="type">Type:</label>
                            <select
                                class="input text-center"
                                v-model="status.type"
                                id="type"
                                :disabled="
                                    status.mode === 'loader' ||
                                        status.mode === 'prompt' ||
                                        status.mode === 'split-prompt'
                                "
                            >
                                <option
                                    value=""
                                    class="text-gray-800 font-hairline"
                                    >Leave empty</option
                                >
                                <option
                                    value="success"
                                    class="text-gray-800 font-hairline"
                                    >Success</option
                                >
                                <option
                                    value="error"
                                    class="text-gray-800 font-hairline"
                                    >Error</option
                                >
                                <option
                                    value="warning"
                                    class="text-gray-800 font-hairline"
                                    >Warning</option
                                >
                                <option
                                    value="info"
                                    class="text-gray-800 font-hairline"
                                    >Info</option
                                >
                            </select>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                        >
                            <label for="type">Mode:</label>
                            <select
                                class="input text-center"
                                v-model="status.mode"
                                id="mode"
                                @change="disableProps"
                            >
                                <option
                                    value=""
                                    class="text-gray-800 font-hairline"
                                    >Leave empty (simple)</option
                                >
                                <option
                                    value="condensed"
                                    class="text-gray-800 font-hairline"
                                    >Condensed</option
                                >

                                <option
                                    value="split-prompt"
                                    class="text-gray-800 font-hairline"
                                    >Split Prompt</option
                                >

                                <option
                                    value="prompt"
                                    class="text-gray-800 font-hairline"
                                    >Prompt</option
                                >
                                <option
                                    value="loader"
                                    class="text-gray-800 font-hairline"
                                    >Loader</option
                                >
                            </select>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                            v-if="status.mode === 'prompt' || status.mode === 'condensed' || status.mode === 'split-prompt'"
                        >
                            <label for="type">Answers:</label>
                            <textarea
                                v-model="status.answers"
                                id="answers"
                                class="input w-3/4 sm:w-2/3 md:w-4/5"
                                placeholder="eg.: {Yes: true, No: false}"
                            >
                            </textarea>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                            v-if="status.mode === 'prompt' || status.mode === 'condensed' || status.mode === 'split-prompt'"
                        >
                            <label for="image">Image:</label>
                            <input
                                type="text"
                                id="url"
                                class="input w-3/4 sm:w-2/3 md:w-4/5"
                                v-model="status.image"
                                placeholder="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            />
                        </div>
                        <div
                            class="flex justify-between align-middle items-center mb-5"
                        >
                            <label for="url">Url:</label>
                            <input
                                type="text"
                                id="url"
                                class="input w-3/4 sm:w-2/3 md:w-4/5"
                                v-model="status.url"
                                placeholder="https://www.example.com"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-full sm:w-1/2 xl:w-1/4 sm:max-w-50 sm:ml-2">
                    <div class="w-1/2 mx-auto lg:w-2/3 xl:w-1/2 mb-12">
                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>Can Be Paused:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="can-pause"
                                    @change="checkTimingProps"
                                    v-model="status.canPause"
                                />
                                <label for="can-pause" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>Can Timeout:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="can-timeout"
                                    v-model="status.canTimeout"
                                    @change="
                                        checkTimingProps();
                                        disableProps();
                                    "
                                />
                                <label for="can-timeout" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>Use Default Title:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="default-title"
                                    v-model="status.defaultTitle"
                                    @change="disableProps"
                                />
                                <label for="default-title" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>Use Light Theme:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="light-theme"
                                    v-model="lightTheme"
                                />
                                <label for="light-theme" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>
                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>With backdrop:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="with-backdrop"
                                    @change="checkIfLoading"
                                    v-model="withBackdrop"
                                />
                                <label for="with-backdrop" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>

                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>On Position:</p>
                            <div>
                              <select
                                  class="input text-center"
                                  v-model="onPosition"
                                  id="type"
                              >
                              <option value="top-left" class="text-gray-800 font-hairline">top-left</option>
                              <option value="top-center" class="text-gray-800 font-hairline">top-center</option>
                              <option value="top-right" class="text-gray-800 font-hairline">top-right</option>
                              <option value="center-left" class="text-gray-800 font-hairline">center-left</option>
                              <option value="center-center" class="text-gray-800 font-hairline">center-center</option>
                              <option value="center-right" class="text-gray-800 font-hairline">center-right</option>
                              <option value="bottom-left" class="text-gray-800 font-hairline">bottom-left</option>
                              <option value="bottom-center" class="text-gray-800 font-hairline">bottom-center</option>
                              <option value="bottom-right" class="text-gray-800 font-hairline">bottom-right</option>
                              </select>
                            </div>
                        </div>


                        <div
                            class="flex justify-between align-middle items-center my-1"
                        >
                            <p>One notification at a time:</p>
                            <div>
                                <input
                                    type="checkbox"
                                    class="cbx"
                                    style="display: none"
                                    id="singular"
                                    @change="checkIfLoading"
                                    v-model="singular"
                                />
                                <label for="singular" class="toggle"
                                    ><span></span
                                ></label>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-around w-full">
                        <div
                            class="flex flex-row justify-between align-middle items-center w-3/4 md:w-2/3 lg:w-10/12 mx-auto"
                        >
                            <label for="duration">Duration:</label>
                            <input
                                type="number"
                                class="input w-1/2 md:w-auto"
                                min="1"
                                step="1"
                                id="duration"
                                :class="{ disabled: !status.canTimeout }"
                                :disabled="!status.canTimeout"
                                v-model="status.duration"
                                placeholder="ms"
                            />
                        </div>
                        <div
                            class="flex flex-row justify-between align-middle items-center w-3/4 md:w-2/3 lg:w-10/12 mt-3 mx-auto"
                        >
                            <label for="icon">Icon:</label>
                            <textarea
                                class="input w-auto sm:w-3/4 md:w-auto"
                                id="icon"
                                v-model="status.icon"
                                placeholder="Html is expected"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex justify-around items-center align-middle flex-wrap my-4"
            >

                <button
                    v-if="status.mode === 'loader'"
                    @click="loadStop"
                    class="btn"
                >
                    Call .stopLoader()
                </button>
                <button @click="addToastify" class="btn">
                    Toastify!
                </button>
            </div>
        </main>
        <transition name="warning">
            <div
                class="bg-gray-200 rounded-lg shadow-lg px-4 py-3 warning absolute text-center"
                style="z-index: 51"
                v-if="showWarning"
            >
                <h3 class="font-bold">
                    With backdrop the rest of the page is inaccessible.
                </h3>
                <h4 class="text-sm mb-3">
                    Make sure to also cancel the loading if your process has
                    failed.
                </h4>
                <button @click="loadStop" class="btn">
                    Call .stopLoader()
                </button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            status: {
                title: "Toastified!",
                body: "This is the body.",
                type: null,
                canPause: false,
                canTimeout: false,
                defaultTitle: true,
                duration: null,
                icon: null,
                mode: "",
                answers: null,
                image: "",
                url: "",
            },
            lightTheme: false,
            defaultTitle: true,
            withBackdrop: false,
            onPosition: 'bottom-right',
            singular: false,
            body: null,
            showWarning: false,
            loading: false
        };
    },
    mounted() {
        this.$vtNotify(this.status);
    },
    methods: {
        addToastify() {
            if (this.status.body.length > 0) {
                if (this.status.mode === "prompt" || this.status.mode === "condensed" || this.status.mode === "split-prompt") {
                    try {
                        const answersString = this.status.answers;
                        this.status.answers = eval("(" + answersString + ")");
                        this.$vToastify.prompt(this.status).then(value => {
                            console.info("The answer was:");
                            console.log(
                                "%c%s",
                                "color: #10bd0a;",
                                value + " (" + typeof value + ")"
                            );
                        });
                        this.status.answers = answersString;
                    } catch (error) {
                        this.$vToastify.error(
                            "Invalid answers object. More info can be found in the console."
                        );
                        console.error(error);
                    }
                } else {
                    this.$vtNotify(this.status);
                    if (this.status.mode === "loader") {
                        this.loading = true;
                        if (this.withBackdrop) {
                            this.showWarning = true;
                        }
                    }
                }
            } else {
                this.$vToastify.error("The body has to be present.", "😠");
            }
        },
        checkTimingProps() {
            if (!this.status.canTimeout) {
                this.status.duration = null;
                this.status.canPause = false;
                setTimeout(() => {
                    document.getElementById("can-pause").checked = false;
                }, 75);
            }
        },
        disableProps() {
            if (
                this.status.mode === "prompt" ||
                this.status.mode === "loader" ||
                this.status.mode === "split-prompt"
            ) {
                this.status.duration = null;
                this.status.defaultTitle = false;
                this.status.canPause = false;
                this.status.canTimeout = false;
                this.status.type = "";
                setTimeout(() => {
                    document.getElementById("can-pause").checked = false;
                    document.getElementById("can-timeout").checked = false;
                    document.getElementById("default-title").checked = false;
                }, 75);
            }
        },
        loadStop() {
            this.$vToastify.stopLoader();
            this.loading = false;
            this.showWarning = false;
        },
        checkIfLoading() {
            if (this.$vToastify.getToast().length < 1) {
                this.withBackdrop = false;
            }
            if (this.loading) {
                this.showWarning = true;
            }
        }
    },
    watch: {
        withBackdrop: function(newValue) {
            this.$vToastify.setSettings({ withBackdrop: newValue });
        },
        onPosition: function(newValue) {
            this.$vToastify.setSettings({ position: newValue });
        },
        lightTheme: function(newValue) {
          if (newValue) {
               document.documentElement.classList.add('mode-dark');
           } else {
               document.documentElement.classList.remove('mode-dark');
           }
            //this.$vToastify.setSettings({ theme: newValue ? "light" : "dark" });
        },
        defaultTitle: function(newValue) {
            this.$vToastify.setSettings({ defaultTitle: newValue });
        },
        singular: function(newValue) {
            this.$vToastify.setSettings({ singular: newValue });
        }
    }
};
</script>

<style lang="scss">
@import "./assets/styles";
.transition-all {
    transition: all 0.2s ease-out;
}
.input {
    @apply rounded-bl-sm h-10 p-2 bg-gray-200 shadow w-auto;
    &:focus {
        box-shadow: inset 0 0 7px 0 rgba(0, 0, 0, 0.05);
        background-color: #eeeeee;
        border-left: 4px solid rgba(46, 80, 138, 0.79);
        border-right: none;
        border-top: none;
        border-bottom: none;
        outline: none;
        transition: all 0.2s ease-out;
    }
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-out;
    min-height: 42px;
}
.disabled {
    cursor: not-allowed;
    background-color: #d0d0d0;
    transition: all 0.2s ease-out;
}
.invalid {
    background-color: #c8847d;
    transition: all 0.2s ease-out;
    &::placeholder {
        color: #2d3748;
    }
}
* {
    font-family: "Poppins", sans-serif;
}
html {
    min-height: 100%;
}
body {
    background: rgb(246, 246, 246);
    width: 100%;
    height: auto;
    background: -moz-linear-gradient(
        180deg,
        rgba(246, 246, 246, 1) 0%,
        rgba(226, 226, 226, 1) 100%
    );
    background: -webkit-linear-gradient(
        180deg,
        rgba(246, 246, 246, 1) 0%,
        rgba(226, 226, 226, 1) 100%
    );
    background: linear-gradient(
        180deg,
        rgba(246, 246, 246, 1) 0%,
        rgba(226, 226, 226, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f6f6f6",endColorstr="#e2e2e2",GradientType=1);
}
#app {
    margin: auto;
}
.btn {
    @apply shadow-md rounded bg-blue-800 text-gray-200 px-5 py-3 bg-blue-700 bg-blue-500;
    transition: all 0.2s ease-out;
    &:hover {
        @apply bg-blue-700;
        transition: all 0.2s ease-out;
    }
    &:active {
        @apply bg-blue-800;
        transition: all 0.2s ease-out;
    }
}
.warning {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.warning-enter-active {
    transition: all 150ms ease-out;
    transition-delay: 150ms;
}
.warning-leave-active {
    transition: all 100ms ease-in;
}
.warning-enter,
.warning-leave-to {
    opacity: 0;
}
</style>
