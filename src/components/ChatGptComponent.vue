<script lang="ts">
import {ref} from 'vue';
import {OpenaiService} from '../services/openaiService';

export default {
    setup() {
        const accessToken = ref('');
        const question = ref('I left 5 clothes to dry out in the sun. It took them 5 hours to dry completely. How long would it take to dry 30 clothes?');
        const addition = ref("Answer: Let's work this out in a step by step way to be sure we have the right answer.");
        const answers = ref<string[]>([]);

        const reflection = ref("You are a researcher tasked with investigating the 3 response options provided. List the flaws and faulty logic of each answer option. Let's work this out in a step by step way to be sure we have all the errors:");
        const reflectionResponse = ref('');

        const resolver = ref("You are a resolver tasked with\n1) finding which of the 3 answer options the researcher thought was best\n2) improving that answer, and\n3) Printing the improved answer in full.\nLet's work this out in a step by step way to be sure we have the right answer.");
        const resolverResponse = ref('');

        OpenaiService.initialize(accessToken.value);

        async function handleGetAnswers() {
            answers.value = await OpenaiService.getAnswers(`Question: ${question.value}\n\n${addition.value}`);
        }

        async function handleReflect() {
            const originalQuestion = `Question: ${question.value}`
            const outputs = answers.value.map((value, index) => `\n\nAnswer ${index + 1}: ${value}`)
            const prompt = originalQuestion.concat(...outputs, '\n\n', reflection.value)
            reflectionResponse.value = await OpenaiService.reflect(prompt);
        }

        async function handleResolve() {
            const originalQuestion = `Question: ${question.value}`
            const outputs = answers.value.map((value, index) => `\n\nAnswer ${index + 1}: ${value}`)
            const prompt = resolver.value.concat(
                originalQuestion, '\n\n',
                ...outputs, '\n\n',
                'Researcher thoughts:\n\n' + reflectionResponse.value,
            )
            resolverResponse.value = await OpenaiService.resolve(prompt);
        }

        return {
            accessToken,
            question,
            addition,
            answers,
            handleGetAnswers,
            reflection,
            reflectionResponse,
            handleReflect,
            resolver,
            resolverResponse,
            handleResolve
        };
    },
};
</script>

<template>
    <div>
        <section>
            <h2>chatGPT API Settings</h2>
            <input type="text" placeholder="Access Token" v-model="accessToken">
        </section>

        <section>
            <h2>Question</h2>
            <input type="text" placeholder="Question: " v-model="question">
            <input type="text" v-model="addition">
            <button @click="handleGetAnswers">Get answers</button>
            <div v-for="(answer, index) in answers" :key="index">
                {{ answer }}
            </div>
        </section>

        <section>
            <h2>Reflection</h2>
            <textarea v-model="reflection"></textarea>
            <button @click="handleReflect">Reflect</button>
            <div>
                {{ reflectionResponse }}
            </div>
        </section>

        <section>
            <h2>Resolver</h2>
            <textarea v-model="resolver"></textarea>
            <button @click="handleResolve">Resolve</button>
            <div>
                {{ resolverResponse }}
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>