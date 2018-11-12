FROM centos:7
MAINTAINER Abyss <roger_ren@qq.com>

RUN yum update -y
RUN yum install python -y
RUN yum install ruby -y
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install nodejs -y