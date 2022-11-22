<template>
    <div class="AddMovie">
        <FirstAddMovieViewVue/>
    </div>
</template>

<script>
import FirstAddMovieViewVue from './FirstAddMovieView.vue';

export default {
    name: 'AddMovieView',
    
    components: {
        FirstAddMovieViewVue,
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.AddMovie {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>