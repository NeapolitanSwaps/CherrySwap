<template>
  <div v-if="miningTransactionObject.status!=null" class="text-center">
    <md-dialog
    class="text-center"
      :md-active.sync="miningTransactionObject.status!=null"
      style="background-color: #DEDDDE;width:600px"
    >
      <md-dialog-title
        v-if="miningTransactionObject.status=='uploading'"
      >Uploading content to IPFS...</md-dialog-title>
      <md-dialog-title v-if="miningTransactionObject.status=='pending'">Approve the transaction...</md-dialog-title>
      <md-dialog-title v-if="miningTransactionObject.status=='done'">Transaction mined!</md-dialog-title>
      <img
        v-if="miningTransactionObject.status=='uploading'"
        class="text-center"
        alt="step logo"
        style="height:150px;"
        src="../../assets/uploading.gif"
      />
      <video
        v-if="miningTransactionObject.status=='pending'"
        class="text-center"
        alt="step logo"
        style="height:200px; margin-left:20px"
        type="video/webm"
        src="../../assets/miningTransaction.webm"
        autoplay="true"
        loop="true"
      />
      <img
        v-if="miningTransactionObject.status=='done'"
        class="text-center"
        alt="step logo"
        style="width:50%; margin-left:120px"
        src="../../assets/unicorn_dabbing.gif"
      />
      <p
        style="padding:30px"
        v-if="miningTransactionObject.status=='uploading'"
      >Your content is being uploaded to IPFS. This could take a few seconds.</p>
      <p
        style="padding:30px"
        v-if="miningTransactionObject.status=='pending'"
      >Approve the transaction in your web3 provider to submit it to the blockchain.</p>

      <p style="padding:30px" v-if="miningTransactionObject.status=='done'">
        Transaction has been mined! You can view the transaction info on EtherScan
        <clickable-transaction :transaction="miningTransactionObject.txHash" />.
      </p>
      <md-button
        v-if="miningTransactionObject.status=='done'"
        class="md-primary md-raised"
        @click="modalClosed"
        style="background: #D81E5B"
      >Close</md-button>
    </md-dialog>
  </div>
</template>

<script>
/* global web3:true */
import { mapActions, mapState } from "vuex";
import ClickableTransaction from "@/components/widgets/ClickableTransaction";
export default {
  name: "miningTransaction",
  components: { ClickableTransaction },
  data: () => ({
    showDialog: true
  }),
  methods: {
    ...mapActions(["CLOSE_MINING_DIALOG"]),
    modalClosed() {
      console.log("CLOSED");
      this.CLOSE_MINING_DIALOG();
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(["etherscanBase", "miningTransactionObject"])
  }
};
</script>

<style>
</style>