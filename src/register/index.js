import { log } from "@/api";
import Vue from "vue";
Object.defineProperty(Vue.prototype, "$log", { value: log });
