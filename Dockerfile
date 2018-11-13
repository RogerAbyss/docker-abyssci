FROM centos:7
MAINTAINER Abyss <roger_ren@qq.com>

RUN yum -y update

# 安装EPEL源
RUN yum -y install epel-release
# zip
RUN yum -y install zip

# Python
RUN yum -y install python
RUN yum -y install python-pip

# Puby
RUN yum -y install ruby
RUN gem install mail

# Node
RUN yum -y install nodejs