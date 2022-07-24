import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/Details.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from "@/views/event/Edit.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 }) // accepts this prop (page) and passes the prop to the EventList component
    // Its like a back and forth thing.
    // it accepts page prop from where it is being called 
    // and passes it to its own component (Event)
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [ // nested routes
      {
        path: "",
        name: "EventDetails",
        component: EventDetails
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit
      },
    ]
  },
  {
    path: '/event/:afterEvent(.*)', // changing :id to :afterEvent(.*) will enable it to
    redirect: to => {  // capture nested routes in the redirect
      return { path: '/events/' + to.params.afterEvent }
    }
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
