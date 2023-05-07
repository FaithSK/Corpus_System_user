<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo" src="@/assets/svg/site-logo.svg" alt=""/>
                <div class="name">
                    <div class="title">中英双语语料库系统</div>
                </div>
            </div>
            <div class="login-form">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="120px"
                         :label-position="'top'" style="margin-top: 10px;">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username"/>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="btn" @click="login(loginFormRef)">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from "vue"
import type {FormInstance, FormRules} from 'element-plus'
import {useLoginApi} from "@/api/login"
import {useUserInfo} from "@/stores/user";
import {ElNotification} from "element-plus";
import {Session} from '@/utils/storage'
import {useRouter} from "vue-router";

const loginApi = useLoginApi()
const userStore = useUserInfo()
const router = useRouter()

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
        {required: true, message: '请输入用户名', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
    ]
})
// 注册表单校验
const registerRules = reactive<FormRules>({
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
    ],
    confirmPassword: [
        {required: true, message: '请输入确认密码', trigger: 'blur'},
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
                if (response.status === 200) {
                    ElNotification({
                        type: 'success',
                        title: 'Success',
                        message: '登录成功',
                        offset: 100,
                    });
                    userStore.setUserInfos({
                        userInfo: {
                            username: response.result.username,
                            token: response.result.token,
                            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                        }
                    })
                    localStorage.setItem('username', response.result.username)
                    localStorage.setItem('token', response.result.token)
                    setTimeout(() => {
                        router.push('/')
                    }, 500)
                }
            }).catch((error: any) => {
                // ElNotification({
                //   type: 'error',
                //   title: 'Error',
                //   message: error,
                //   offset: 100,
                // })
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

</script>

<style scoped>
.btn {
    display: block;
    width: 100%;
    margin-top: 30px;
}

.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
    background-color: #fff;
}

.login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
}

.head .title {
    font-size: 28px;
    color: #c7254e;
    font-weight: bold;
}

.head .tips {
    font-size: 12px;
    color: #999;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

</style>
