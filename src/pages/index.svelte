<script>
  import { onMount } from 'svelte';
  import account from '../utils/account';
  import sl from '../utils/sl';
  const ADDRESS_PREFIX = 'bluzelle';

  let address;
  let balance;
  let kvs = [];

  onMount(async function () {
    if (await account.loadPrivateKeyFromCache()) {
      await loadAccount();
    }
  });

  async function connectAccount() {
    const mnemonic = prompt('Enter mnemonic:');
    if (mnemonic && await account.loadPrivateKeyFromMnemonic(mnemonic)) {
      await loadAccount();
    }
  }

  function disconnectAccount() {
    account.disconnect();
    address = null;
  }

  async function loadAccount() {
    address = account.deriveAddress(ADDRESS_PREFIX);
    await account.loadAccount();
    const { coins } = account.account;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      if (coin.denom === 'ubnt') {
        balance = coin.amount;
        break;
      }
    }
    await loadKVs();
  }

  async function loadKVs() {
    const { keyvalues } = await account.query(`/crud/keyvalues/${address}`);
    kvs = keyvalues;
  }

  async function onAddKey() {
    try {
      const Key = prompt('Key?');
      if (Key) {
        await account.tx('post', '/crud/create', {
        Key,
        Owner: address,
        UUID: address,
        Value: 'value',
      });
        sl('success', 'ADDED KEY!');
        await loadKVs();
      }
    } catch (e) {
      sl('error', e);
    }
  }

  async function onDeleteKey(Key) {
    try {
      await account.tx('delete', '/crud/delete', { Key, Owner: address, UUID: address });
      sl('success', 'DELETED KEY!');
      await loadKVs();
    } catch (e) {
      sl('error', e);
    }
  }

  async function onDeleteAll() {
    try {
      await account.tx('post', '/crud/deleteall', { Owner: address, UUID: address });
      sl('success', 'DELETED ALL KEYS!');
      await loadKVs();
    } catch (e) {
      sl('error', e);
    }
  }
</script>

<style>
  .main-container {
    min-width: 960px;
  }
</style>

<div class="flex justify-center">
  <div class="main-container flex flex-col">
    {#if address}
        <!-- -->
    {:else}
      <div class="mb-5">
        <small>sample mnemonic: <strong>around buzz diagram captain obtain detail salon mango muffin brother morning
        jeans display attend knife carry green dwarf vendor hungry fan route pumpkin car</strong></small>
      </div>
    {/if}

    <div class="flex mb-5 items-center">
      <h1 class="main-heading flex-grow">BLUZELLE</h1>
      {#if address}
        <button class="button is-light is-small ml-2" on:click={disconnectAccount}>
          DISCONNECT
        </button>
      {:else}
        <button class="button is-light is-small" on:click={connectAccount}>
          CONNECT
        </button>
      {/if}
    </div>

    {#if address}
      <div class="mb-5">
        <div>Account: {address}</div>
        <div>Balance: {balance}ubnt</div>
        <div>UUID: {address}</div>
      </div>
      <div class="flex mb-5 items-center">
        <h1 class="main-heading mr-5">KEYS</h1>
        <button class="button is-light is-small" on:click={onAddKey}>
          +ADD
        </button>
        <div class="flex flex-grow"></div>
        <button class="button is-light is-small" on:click={onDeleteAll}>
          DELETE ALL
        </button>
      </div>
    {/if}

    <div class="flex flex-grow">
      <table class="table flex-grow">
        <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {#each kvs as kv}
          <tr>
            <td>{kv.key}</td>
            <td>{kv.value}</td>
            <td>
              <button class="button is-light is-small" on:click={() => onDeleteKey(kv.key)}>
                DELETE
              </button>
            </td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
