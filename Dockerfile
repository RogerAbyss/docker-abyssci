FROM centos:7
MAINTAINER Abyss <roger_ren@qq.com>

RUN yum -y update
RUN yum -y install epel-release

# Python
RUN yum -y install python
RUN yum -y install python-pip

# Puby
RUN yum -y install ruby

# Node
RUN yum -y install nodejs