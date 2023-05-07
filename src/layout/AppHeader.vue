<template>
  <div id="layout-header" @click.stop="mobileShow=false">
    <div class="site-logo">
      <router-link to="/">
        <img src="@/assets/svg/site-logo.svg" alt="">
        <p class="site-name">语料库</p>
      </router-link>
    </div>
    <div class="menus-btn" @click.stop="mobileShow=!mobileShow">
      <el-icon size="24"><Menu /></el-icon>
    </div>
    <div class="site-menus" :class="{'mobileShow':mobileShow}" @click.stop="mobileShow=!mobileShow">
      <div class="menu-item">
        <el-popover
            placement="top-start"
            :width="200"
            :offset="40"
            trigger="click"
        >
          <template #reference>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" class="login-avatar">
          </template>
          <div class="login-popover">
            <!--<div>登录网站，开启你的创作之旅：</div>-->
            <div><el-button type="danger" class="btn" @click="onLoginOut">退出登录</el-button></div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
  <!--<el-dialog-->
  <!--    class="dynamicDialog"-->
  <!--    v-model="dialogVisible"-->
  <!--    width="500px"-->
  <!--&gt;-->
  <!--  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="onChangeTab">-->
  <!--    <el-tab-pane label="登录" name="login">-->
  <!--      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="120px" :label-position="'top'" style="margin-top: 10px;">-->
  <!--        <el-form-item label="用户名" prop="username">-->
  <!--          <el-input v-model="loginForm.username" />-->
  <!--        </el-form-item>-->
  <!--        <el-form-item label="密码" prop="password">-->
  <!--          <el-input v-model="loginForm.password" />-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--    </el-tab-pane>-->
  <!--    &lt;!&ndash;<el-tab-pane label="注册" name="register">&ndash;&gt;-->
  <!--    &lt;!&ndash;  <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-width="120px" :label-position="'top'" style="margin-top: 10px;">&ndash;&gt;-->
  <!--    &lt;!&ndash;    <el-form-item label="用户名" prop="username">&ndash;&gt;-->
  <!--    &lt;!&ndash;      <el-input v-model="registerForm.username" />&ndash;&gt;-->
  <!--    &lt;!&ndash;    </el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;    <el-form-item label="密码" prop="password">&ndash;&gt;-->
  <!--    &lt;!&ndash;      <el-input v-model="registerForm.password" />&ndash;&gt;-->
  <!--    &lt;!&ndash;    </el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;    <el-form-item label="确认密码" prop="confirmPassword">&ndash;&gt;-->
  <!--    &lt;!&ndash;      <el-input v-model="registerForm.confirmPassword" />&ndash;&gt;-->
  <!--    &lt;!&ndash;    </el-form-item>&ndash;&gt;-->
  <!--    &lt;!&ndash;  </el-form>&ndash;&gt;-->
  <!--    &lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
  <!--  </el-tabs>-->
  <!--  <template #footer>-->
  <!--    <span class="dialog-footer">-->
  <!--      <el-button v-if="activeName === 'login'" type="primary" class="btn" @click="login(loginFormRef)">登录</el-button>-->
  <!--      <el-button v-else type="primary" class="btn" @click="register(registerFormRef)">注册</el-button>-->
  <!--    </span>-->
  <!--  </template>-->
  <!--</el-dialog>-->
</template>

<script lang="ts" setup>
import {ref, reactive} from "vue"
import {Menu} from "@element-plus/icons-vue"
import {RouterLink, useRouter} from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import {useLoginApi} from "@/api/login"
import {useUserInfo} from "@/stores/user";
import {ElNotification} from "element-plus";
import { Session } from '@/utils/storage'
const loginApi = useLoginApi()
const userStore = useUserInfo()

const router = useRouter()
let mobileShow = ref(false)
let dialogVisible = ref(false)
let activeName = ref('login')
let dialogTitle = ref('登录')
// 登录表单form
const loginForm = ref({
  username: '',
  password: ''
})
// 注册表单form
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
// 登录表单ref
const loginFormRef = ref<FormInstance>()
// 注册表单ref
const registerFormRef = ref<FormInstance>()
// 登录表单校验
const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})
// 注册表单校验
const registerRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
  ]
})
// 显示登录弹框
const onLogin = () => {
  dialogVisible.value = true
}
// 切换tab
const onChangeTab = () => {
  if (activeName.value === 'login') {
    dialogTitle.value = '注册'
  } else {
    dialogTitle.value = '登录'
  }
}
// 登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi.signIn(loginForm.value).then((response: any) => {
        // location.reload()
        ElNotification({
          type: 'success',
          title: 'Success',
          message: '登录成功',
          offset: 100,
        })
        userStore.setUserInfos({
          userInfo: {
            username: response.result.username,
            token: response.result.token,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
        })
        Session.set('username', response.result.username)
        Session.set('token', response.result.token)
        Session.set('avatar', response.result.avatar)
        setTimeout(() => {
          location.reload()
        }, 1000)

      }).catch((error: any) => {
        ElNotification({
          type: 'error',
          title: 'Error',
          message: error,
          offset: 100,
        })
      })
    }
  })
}
// 注册
const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginApi.register(registerForm.value).then((response: any) => {
        // location.reload()
      })
    }
  })
}
// 退出登录
const onLoginOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

</script>

<style lang="less" scoped>
#layout-header {
  position: fixed;
  top: 0;
  z-index: 10000;
  background-color: #FFFFFF;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: .3s all ease;
  -webkit-transition: .3s all ease;
  -moz-transition: .3s all linear;
  -o-transition: .3s all ease;
  -ms-transition: .3s all ease;
  &.hidden{
    top: -100px;
  }
  &.fixed{
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.site-logo {
  text-align: center;

  img {
    width: 60px;
    height: 60px;
  }

  p.site-name {
    font-size: 15px;
    font-weight: bold;
    position: relative;
    top: -10px;
  }
}

.menus-btn{
  display: none;
  visibility: hidden;
}

.site-menus {
  display: flex;
  align-items: center;

  .menu-item {
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    a{
      padding: 12px 10px;
      color: #545454;
      font-weight: 500;
      font-size: 16px;
      &:hover {
        color: #ff6d6d;
      }
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
    &.hasChild:hover .childMenu{
      opacity:1;
      visibility: visible;
      transform: translateY(-5px);
    }
  }
  .childMenu{
    width: 130px;
    background-color: #FDFDFD;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 55px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: .7s all ease;
    -webkit-transition: .6s all ease;
    -moz-transition: .6s all linear;
    -o-transition: .6s all ease;
    -ms-transition: .6s all ease;
    &:before,&:after{
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid white;
      top: -8px;
      left: 20px;
    }
    &:before {
      top: -9px;
      border-bottom: 8px solid #ddd;
    }
    .sub-menu{
      height: 40px;
      line-height: 40px;
      position: relative;
      &:not(:last-child):after{
        /*position: absolute;*/
        content: '';
        width: 50%;
        height: 1px;
        color: #ff6d6d;
        bottom: 0;
        left: 25%;
        z-index: 99;
      }
    }
  }
}

.login-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.login-popover {
  padding: 10px;

  .btn {
    display: block;width: 100%;
  }
}

.btn {
  display: block;width: 100%;
}

@media (max-width: 960px){
  #layout-header{
    padding: 0 20px;
  }
}
@media (max-width: 600px){
  #layout-header{
    padding: 0 10px;
  }
  .menus-btn{
    display: block;
    visibility: visible;
  }
  .site-menus{
    position: absolute;
    display: none;
    visibility: hidden;
    background-color: #F9F9F9;
    width: 100%;
    left: 0;
    top: 80px;
    z-index: -9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .menu-item{
      position: relative;
      height: unset;
      &:not(:last-child) {
        margin-right: 0;
      }
    }
    .childMenu{
      position: relative;
      width: 100%;
      top: 0;
      background-color: #F3F3F3;
      opacity: 1;
      visibility: visible;
      border: none;
      box-shadow: none;
      &:before,&:after{
        content: '';
        position: relative;
        width: 0;
        height: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }
  .site-menus.mobileShow{
    display: inline-block;
    visibility: visible;
    z-index: 99;
  }
}

</style>
