<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"/>
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow=true"
    />
    <van-cell
      title="性别"
      is-link :value="user.gender === 0 ? '男': '女'"
      @click="isEditGenderShow=true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow=true"
    />

    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }">
      <!--      当你传递给子组件的数据既要使用也要修改
      这种情况下可以使用v-model简写，只能使用一次
      如果有多个数据需要保持同步，使用.sync修饰符
      如,:name.sync='user.name',效果和v-model一样
      -->
      <!--      :name="user.name"
        @update-name="user.name = $event"-->
      <update-name
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow=false"
      />
    </van-popup>

    <van-popup
      v-model="isEditGenderShow"
      position="bottom">
      <update-gender
        v-model="user.gender"
        @close="isEditGenderShow=false"
      />
    </van-popup>

    <van-popup
      v-if="isEditBirthdayShow"
      v-model="isEditBirthdayShow"
      position="bottom">
      <update-birthday
        v-model="user.birthday"
        @close="isEditBirthdayShow=false"
      />
    </van-popup>

    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }">
      <update-photo
        :file="previewImage"
        @close="isEditPhotoShow=false"
        @update-photo="user.photo=$event"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  created () {
    this.loadUserProfile()
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previewImage: null
    }
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      this.previewImage = this.$refs.file.files[0]
      this.isEditPhotoShow = true
      // 为了解决相同文件不触发change事件，所以手动情况file的value
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.van-popup{
  background-color: #f5f7f9;
}
</style>
