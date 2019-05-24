const socket = io();

socket.on('message-received', msg => {
    app.transcriptionData.transcriptionMessages = msg.transcriptionMessages
});

const transcriptionData = {
    fullUrl: "fullUrl",
    overlayUrl: "overlayUrl",
    callRoomId: 1,
    callUuid: "callUuid",
    callDuration: "callDuration",
    callStarted: "callStarted",
    callFinished: "callFinished",
    transcriptionMessages: []
};
const viewModel = {
    view: 'start-call', // start-call, transcription
    transcriptionData
};


Vue.component('call-starter', {
    data: () => ({
        baseUrl: 'https://my.yack.net/api/v3/public/integration/call-setup',
        phoneNumber: '',
        callLink: '',
        callbackUrl: '',
        callbackToken: '',
        teamId: 0,
        userEmail: '',
        transcriptRequired: false,
        transcriptUpdateNotification: false
    }),
    computed: {
        link: function () {
            const pn = `phone-number=${this.phoneNumber}`;
            const callLink = this.callLink ? `&call-link=${this.callLink}` : '';
            const callbackUrl = this.callLink ? `&callback-url=${this.callbackUrl}` : '';
            const callbackToken = this.callbackToken ? `&callback-token=${this.callbackToken}` : '';
            const teamId = this.teamId ? `&team-id=${this.teamId}` : '';
            const userEmail = this.userEmail ? `&user-email=${this.userEmail}` : '';
            const transcriptRequired = this.transcriptRequired ? `&transcript-required=${this.transcriptRequired}` : '';
            const transcriptUpdateNotification = this.transcriptUpdateNotification ? `&transcript-update-notification=${this.transcriptUpdateNotification}` : '';
            return `${this.baseUrl}?${pn}${callLink}${callbackUrl}${callbackToken}${teamId}${userEmail}${transcriptRequired}${transcriptUpdateNotification}`;
        },
    },
    methods: {
        openInNewWindow: function () {
            const newwindow = window.open(this.link, `call ${this.phoneNumber}`, 'height=300,width=300,toolbar=0,menubar=0,location=0');
            if (window.focus) {
                newwindow.focus()
            }
            return false;
        }
    },
    template: `
<div class="call-started-component">
    <div>    
        <div class="form-group row">
            <label for="phoneNumber" class="col-sm-2">phone number</label>
            <div class="col-sm-10">
                <input v-model="phoneNumber" id="phoneNumber" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <label for="callLink" class="col-sm-2">call link</label>
            <div class="col-sm-10">
                <input v-model="callLink" id="callLink" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <label for="callbackUrl" class="col-sm-2">callback url</label>
            <div class="col-sm-10">
                <input v-model="callbackUrl" id="callbackUrl" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <label for="callbackToken" class="col-sm-2">callback token</label>
            <div class="col-sm-10">
                <input v-model="callbackToken" id="callbackToken" class="form-control">
            </div>
        </div>
        <div class="form-group row">  
            <label for="teamId" class="col-sm-2">team id</label>
            <div class="col-sm-10">
                <input v-model="teamId" id="teamId" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <label for="userEmail" class="col-sm-2">user email</label>
            <div class="col-sm-10">
                <input v-model="userEmail" id="userEmail" class="form-control">
            </div>
        </div>
        <div class="form-group form-check">          
            <input v-model="transcriptRequired" id="transcriptRequired" class="form-check-input" type="checkbox" true-value="true" false-value="false">
            <label for="transcriptRequired">transcript required</label>
        </div>
        <div class="form-group form-check">            
            <input v-model="transcriptUpdateNotification" id="transcriptUpdateNotification" class="form-check-input" type="checkbox" true-value="true" false-value="false">
            <label for="transcriptUpdateNotification">transcript update notification</label>
        </div>
    </div>  
    <div><a v-bind:href="link" target="_blank">{{link}}</a></div>
    <div><button v-on:click="openInNewWindow">Open</button></div>
</div>

    `
});


const app = new Vue({
    el: '#app',
    data: viewModel
});