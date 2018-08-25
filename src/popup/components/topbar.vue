<style lang="scss">
  .topbar {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    background-color: #efefef; 
  }
  .topbar-logo{
    width: 35px;
    height: 35px;
     margin-top: 3px;
  }
  .topbar .topbar-selection{
    margin: 0 20px;
    vertical-align: middle;
  }
</style>

<template>
  <section class="topbar">
    <img class="topbar-logo" src="../../assets/logo.png">
    <div class="topbar-selection">
      <Select v-model="model1" style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </section>
</template>


<script>
import crun from '@/common/crun'
import bus from '../util/bus'
export default {
  props: {
    view: {
      type: String,
      default: 'search'
    }
  },
  data () {
    return {
      cityList: [
          {
              value: '比原主网',
              label: '比原主网'
          },
          {
              value: '比原测试网',
              label: '比原测试网'
          }
      ],
      model1: '',
      keyword: '',
      hotWord: '',
      tipMod: 0
    }
  },
  computed: {
    syncView: {
      get () {
        return this.view
      },
      set (v) {
        this.$emit('update:view', v)
      }
    },
    tipText () {
      const { tipMod } = this
      if (!tipMod) return
      return tipMod > 0 ? '+ 1' : '- 1'
    },
    btnList () {
      const { shuffleSearch, shwoCollect, showConfig, tipText, view } = this
      return [
        {
          icon: 'icon-shuffle',
          text: '随便看看',
          handler: shuffleSearch
        },
        {
          icon: 'icon-favorite_border',
          text: '我的收藏',
          tip: tipText,
          class: { active: view === 'collect' },
          handler: shwoCollect
        },
        {
          icon: 'icon-settings',
          text: '设置',
          class: { active: view === 'config' },
          handler: showConfig
        }
      ]
    }
  },
  created () {
    bus.$on('update-collect-tip', this.updateCollectTip)
  },
  beforeDestroy () {
    bus.$off('update-collect-tip', this.updateCollectTip)
  },
  methods: {
    updateCollectTip (v) {
      this.tipMod = v
      setTimeout(() => {
        this.tipMod = 0
      }, 600)
    },
    showView (view) {
      const { syncView } = this
      if (syncView !== view) {
        this.syncView = view
      } else {
        this.syncView = 'search'
      }
    },
    showConfig () {
      this.showView('config')
    },
    shwoCollect () {
      this.showView('collect')
    },
    fetchExp () {
      if (!this.keyword) {
        return this.shuffleSearch()
      }
      this.$emit('fetch-exp', `${this.keyword} 表情`)
    }
  }
}
</script>