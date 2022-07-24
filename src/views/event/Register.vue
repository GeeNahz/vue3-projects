<template>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
    props: ['event'],
    methods: {
        register() {
            // call to api
            // if register then redirect to event details

            this.$router.push({
                name: 'EventDetails'
            })
        }
    }
}
</script>