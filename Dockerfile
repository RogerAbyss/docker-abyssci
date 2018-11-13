FROM centos:7
MAINTAINER Abyss <roger_ren@qq.com>

RUN yum update -y

# Python
RUN yum install python -y

# Puby
RUN yum install ruby -y

# Node
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install nodejs -y