<template>
    <AppBody>
        <Banner @search="search"/>
        <div class="site-content animate">
            <!--通知栏-->
            <div v-if="searchWords" class="notify">
                <div class="search-result">
                    <span>搜索结果："{{ searchWords }}" 相关单词</span>
                </div>
            </div>
            <div class="top-feature">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">
                        <small-icon/>
                        查询结果
                    </div>
                </section-title>
                <div class="list">
                    <div v-for="(item, index) in list" :key="index" class="item" @click="onClickItem(item)">
                        <div class="title">
                            <img :src="item.logo" alt="">
                            <div class="main">{{ item.name }}</div>
                            <div class="link">
                                <img src="@/assets/svg/position.svg" style="width: 30px;height: 30px;">
                            </div>
                        </div>
                        <div class="content">
                            <div>出处: {{ item.stuno }}</div>
                            <div>释义: {{ item.translate }}</div>
                            <div>课程: {{ item.gradeClass !== null ? item.gradeClass.name : '' }}</div>
                        </div>
                    </div>
                </div>
                <div class="load-more">
                    <div v-if="showMore" class="btn" @click="onLoadMore">
                        <a href="#">查看更多</a>
                    </div>
                </div>
            </div>
        </div>
    </AppBody>
    <el-dialog
            v-model="dialogVisible"
            title="词义解析"
            width="700px"
    >
        <el-descriptions :column="1">
            <el-descriptions-item label="出处">{{ currentItem.stuno }}</el-descriptions-item>
            <el-descriptions-item label="单词">{{ currentItem.name }}</el-descriptions-item>
            <el-descriptions-item label="课程">{{
                currentItem.gradeClass !== null ? currentItem.gradeClass.name : ''
                }}
            </el-descriptions-item>
            <el-descriptions-item label="释义">{{ currentItem.translate }}</el-descriptions-item>
            <!--      <el-descriptions-item label="创建时间">{{ currentItem.createTime }}</el-descriptions-item>-->
        </el-descriptions>
        <template #footer>
      <span class="dialog-footer">

      </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import AppBody from "@/layout/AppBody.vue";
import Banner from "@/components/Banner.vue"
import SmallIcon from "@/components/SmallIcon.vue"
import SectionTitle from "@/components/SectionTitle.vue"
import {onMounted, ref} from "vue"
import {useStudentApi} from "@/api/student";

let dialogVisible = ref(false)
let searchWords = ref('')
let pageIndex = ref(1)
let pageSize = ref(10)
let currentItem = ref(null)
const studentApi = useStudentApi()
const list = ref<any[]>([])
const loading = ref(true)
const showMore = ref(false)

onMounted(() => {
    fetchData()
})

// 查询列表
const fetchData = () => {
    loading.value = true
    const params = {
        pageIndex: pageIndex.value,
        pageSize: pageSize.value,
        searchValue: searchWords.value
    }
    return studentApi.list(params).then(response => {
        const {content} = response
        if (Array.isArray(content) && content.length > 0) {
            for (const i in content) {
                content[i]['logo'] = 'https://img1.baidu.com/it/u=943390663,3323925491&fm=253&fmt=auto&app=120&f=JPEG?w=256&h=256';
                list.value.push(content[i])
            }
            showMore.value = true
        } else {
            showMore.value = false
        }
        loading.value = false
    })
}

// 搜索
const search = (value: string) => {
    searchWords.value = value
    pageIndex.value = 1;
    list.value = []
    fetchData()
}

// 查看详情
const onClickItem = (result: any) => {
    currentItem.value = result
    dialogVisible.value = true
}

// 加载更多
const onLoadMore = () => {
    ++pageIndex.value
    fetchData()
}
</script>

<style scoped lang="less">

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;

  .btn {
    width: 120px;
    height: 50px;
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ADADAD;
  }
}

.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;

    & > div {
      padding: 20px;
    }
  }

  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  margin-top: 20px;

  .item {
    width: 100%;
    height: 180px;
    padding: 20px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      margin-top: -5px;
      box-shadow: 0 1px 3px rgb(107 159 175 / 20%);

      .title .main::after {
        width: 100%;
      }
    }

    .title {
      height: 50px;
      display: flex;
      align-items: center;
      position: relative;

      .main {
        position: relative;

        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 20px;
          width: 0;
          height: 2px;
          background-color: #727cf5;
          opacity: 0.9;
          transition: all .4s;
        }
      }

      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 50px;
        transition: all 0.3s;
      }

      .link {
        position: absolute;
        right: 0;
      }
    }

    .content {
      margin-top: 20px;
      color: #666666;
      font-size: 15px;

      div {
        padding-bottom: 8px;
      }
    }
  }
}


@media (max-width: 1200px) {
  .list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 800px) {
  .list {
    grid-template-columns: 1fr;
  }

  .site-content {

    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}

</style>
