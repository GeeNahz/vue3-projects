import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventDetails from "@/views/EventDetails.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 }) // accepts this prop (page) and passes the prop to the EventList component
    // Its like a back and forth thing.
    // it accepts page prop from where it is being called 
    // and passes it to its own component (EventList)
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetails
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
