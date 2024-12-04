<template>
<div class="flex gap-4">
    <div class=" shadow rounded-lg w-1/2">
        <div class="p-6 border-b">
            <h2 class="text-lg font-bold text">Deposits</h2>
        </div>
        <div class="flex flex-col p-6 gap-4">
            <!-- Total Deposited -->
            <div class="flex items-center space-x-3 ">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="text-green-500">💵</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.successDeposits }} EGP</div>
                    <div class="text-sm">Total Deposited</div>
                </div>
            </div>
            <!-- Pending Deposits -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i class="text-yellow-500">⏳</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.pendingDeposits }} EGP</div>
                    <div class="text-sm">Pending Deposits</div>
                </div>
            </div>
            <!-- Rejected Deposits -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <i class="text-red-500">❌</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.failedDeposits }} EGP</div>
                    <div class="text-sm">Rejected Deposits</div>
                </div>
            </div>
            <!-- Deposited Charge -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="text-blue-500">%</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.depositCharge }} EGP</div>
                    <div class="text-sm">Deposited Charge</div>
                </div>
            </div>
        </div>
    </div>
    <div class=" shadow rounded-lg w-1/2">
        <!-- Withdrawals -->
        <div class="p-6 border-b">
            <h2 class="text-lg font-bold">Withdrawals</h2>
        </div>
        <div class="flex flex-col p-6 gap-4">
            <!-- Total Withdrawn -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i class="text-green-500">💳</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.successWithdrawals }} EGP</div>
                    <div class="text-sm">Total Withdrawn</div>
                </div>
            </div>
            <!-- Pending Withdrawals -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i class="text-yellow-500">⏳</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.pendingWithdrawals }} EGP</div>
                    <div class="text-sm">Pending Withdrawals</div>
                </div>
            </div>
            <!-- Rejected Withdrawals -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <i class="text-red-500">❌</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.failedWithdrawals }} EGP</div>
                    <div class="text-sm">Rejected Withdrawals</div>
                </div>
            </div>
            <!-- Withdrawal Charge -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="text-blue-500">%</i>
                </div>
                <div>
                    <div class="text-sm font-semibold">{{ depositsAndWithdrawals.withdrawalCharge }} EGP</div>
                    <div class="text-sm">Withdrawal Charge</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      depositsAndWithdrawals: [],
    };
  },
  methods: {
    fetchDepositsAndWithdrawals() {
        Nova.request().get('/nova-vendor/depositsandwithdrawals/get-deposits-and-withdrawals').then((response) => {
            this.depositsAndWithdrawals = response.data;
        });
    }
  },
  mounted() {
    this.fetchDepositsAndWithdrawals();
  }
}
</script>
