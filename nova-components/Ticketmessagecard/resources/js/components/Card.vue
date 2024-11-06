<template>
    <Card class="flex flex-col items-center justify-center overflow-x-auto">
        <div class="header">
            <h3 class="text-center font-bold text-xl">
                Messages Of Ticket #{{ data.ticket_number }} -
                {{ data.ticket_title }}
            </h3>
            <div class="status-section">
                <label for="status-select" class="status-label">Status:</label>
                <select id="status-select" v-model="selectedStatus" class="status-select">
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
        <div
            v-for="message in data.messages"
            :key="message.id"
            :class="{
                'admin-message': message.message_from === 'admin',
                'user-message': message.message_from === 'user',
            }"
            :style="{
                'background-color': message.message_from === 'admin' ? '#f0f0f0' : '#e0e0ff',
            }"
          >
            <div class="flex items-center">
                <div class="header ">
                    <template v-if="message.message_from === 'user'">
                        <button
                            class="link"
                            @click="ClientResource(message.client.id)"
                        >
                            <h4 class="client-name text-right">
                                {{ message.client.name }}
                            </h4>
                        </button>
                        <div
                            v-html="
                                getClientImage(message.client.profile_image_url)
                            "
                            class="client-image ml-2"
                        ></div>
                    </template>
                    <template v-else>
                        <Button @click="UserResource(message.user.id)" class="admin-name">{{ message.user.name }}</Button>
                    </template>
                </div>
            </div>
            <div v-if="message.image!==null && message.image!==''">
                <img :src="message.image_url" target="_blank" class="file-link">
            </div>
            <p class="message-content">{{ message.message }}</p>
            <span class="time">{{ message.created_at_human }}</span>
        </div>
    <div class="message-input mt-4 w-full">
        <textarea
            v-model="newMessage"
            placeholder="Type your message here..."
            class="w-full p-2 border rounded"
            rows="4"
        ></textarea>
        <input
            type="file"
            @change="handleFileUpload"
            class="file-input mt-2"
        />
        <button
            @click="sendMessage"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded send-button"
        >
            Send
        </button>
    </div>
    </Card>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
const client_resource_url = "/resources/clients";
const props = defineProps(["card", "resource", "resourceId", "resourceName"]);
const messages = ref([]);
const selectedStatus = ref("");
const data = reactive({
    ticket_id: props.resourceId,
    ticket_title: "",
    ticket_number: "",
    messages: [],
    client_resource_url: props.client_resource_url,
});

const newMessage = ref("");

const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
<defs></defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
  <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;

function getClientImage(image) {
    return image
        ? `<img src="${image}" alt="Client Image" class="client-image" />`
        : defaultSvg;
}

function ClientResource(id) {
    Nova.visit("/resources/clients/" + id);
}
function UserResource(id) {
    Nova.visit("/resources/users/" + id);
}
function fetchMessages() {
      if (props.resourceId) {
        Nova.request(
            "/nova-vendor/ticketmessagecard/get-messages/" + props.resourceId
        ).then((res) => {
            data.ticket_title = res.data[0].ticket.title;
            data.ticket_number = res.data[0].ticket.ticket_id;
            selectedStatus.value = res.data[0].ticket.status;
            data.messages = res.data.map((msg) => ({
                ...msg,
                isAdmin: msg.message_from === "admin",
            }));
        });
    } else {
        console.warn("no ticket id");
    }
}
function updateStatus(status){
    Nova.request()
        .post('/nova-vendor/ticketmessagecard/update-status', {
            ticket_id: data.ticket_id,
            status: status
        })
        .then((response) => {
        if(status !== ""){
            if(status === "open" || status === "completed"){
                Nova.success("Status updated To : " + status);
            } else if(status === "pending"){
                Nova.warning("Status updated To : " + status);
            } else {
                Nova.error("Status updated To : " + status);
            }
        }
        });
}
onMounted(() => {
    fetchMessages();
});

watch(selectedStatus, (newVal, oldVal) => {
    if (newVal !== oldVal && newVal !== "" && newVal !== null && oldVal !== "" && oldVal !== null) {
        updateStatus(newVal);
        console.log("Status changed to:", newVal);
    }
});

function sendMessage() {
    if (!newMessage.value.trim()) {
        return; // Do not send empty messages
    }

    const messageData = {
        message: newMessage.value,
        ticket_id: data.ticket_id,
        message_from: 'admin', // Assuming the message is from the user
    };

    Nova.request()
        .post('/nova-vendor/ticketmessagecard/send-message', messageData)
        .then((response) => {
            fetchMessages();
            newMessage.value = ""; // Clear the input field
        })
        .catch((error) => {
            console.error("Error sending message:", error);
        });
}
</script>
