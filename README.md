# AbyssCI 环境

```
CI/CD会用到的环境, 推送保存在官方Docker仓库
```

### 环境

- [x] centos7
- [x] EPEL源
- [x] zip
- [x] python
- [x] python-pip
- [x] ruby
- [x] ruby-mail
- [x] nodejs
- [x] git

### 调试方法

#### gitlab管理
```shell
# 启动
sudo gitlab-ctl start
# 停止
sudo gitlab-ctl stop
# 重启
sudo gitlab-ctl restart
# 修改配置
vim /etc/gitlab/gitlab.rb
# 重新配置生效
sudo gitlab-ctl reconfigure
# 查看服务器状态
sudo gitlab-ctl status
# 修改管理员密码
sudo gitlab-rails console production
user = User.where(id: 1).first
user.password = '新密码'
user.password_confirmation = '新密码'
user.save!
###########
# 日志相关
###########
# 检查redis的日志
sudo gitlab-ctl tail redis
# 检查postgresql的日志
sudo gitlab-ctl tail postgresql
# 检查gitlab-workhorse的日志
sudo gitlab-ctl tail gitlab-workhorse
# 检查logrotate的日志
sudo gitlab-ctl tail logrotate
# 检查nginx的日志
sudo gitlab-ctl tail nginx
# 检查sidekiq的日志
sudo gitlab-ctl tail sidekiq
# 检查unicorn的日志
sudo gitlab-ctl tail unicorn
```
#### docker常用命令
```shell
# 拉取镜像
docker pull ${someimages}
# 查看本地镜像
docker images
# 删除本地镜像
docker rmi ${imageId}
# 运行Docker (-d 守护进程)
docker run -d
# 查看运行容器 (-a 所有的,包括已经停止的)
docker ps -a
# 进入容器调试
docker exec -it ${containerid} /bin/bash
# 删除容器 (需要停止 或者 -f强制)
docker rm ${containerid}
docker rm $(docker ps -a -q)
# 本地创建image
docker build -t ${user_name/image_name:version} . 
```
#### gitlab-CI/CD
```yml
image: rogerabyss/abyssci:0.4
```
#### 其他
```shell
# gitlab-runner每次都拉取docke image的解决方法
# pull_policy --> if-not-present
vim /srv/gitlab-runner/config/config.toml
volumes = ["/cache", "{$PATH}"]
pull_policy = "if-not-present"
# Docker开机启动
systemctl enable docker
usermod -aG docker ${your_username}
```
### 更新
2019.01.09 - rogerabyss/abyssci   0.4