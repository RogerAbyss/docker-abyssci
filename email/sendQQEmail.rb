# 发送邮件
#
# Function
# 发送邮件
# 参数:
# sender    发送人邮箱
# token     授权码
# manager   管理员邮箱(接收)
# 可选
# reciver   接收人邮箱s(抄送)
# erb_      模板参数
#
# @copyright 2018 by Abyss
# roger_ren@qq.com

require "mail"
require "erb"

def sendQQEmail(sender, token, manager,
    fileName="",
    filePath="",
    reciver="",
    erb_theme="来自AbyssCI的通知",
    erb_title="来自AbyssCI的通知",
    erb_content="",
    erb_action="Thank U",
    erb_action_url="",
    erb_code="")

    smtp = {
        :address => 'smtp.qq.com', 
        :port => 25, 
        :domain => 'qq.com', 
        :user_name => sender, 
        :password => token,
        :enable_starttls_auto => true,
        :openssl_verify_mode => 'none', 
    }

    Mail.defaults { delivery_method :smtp, smtp}


    @erb_theme = erb_theme
    @erb_title = erb_title
    @erb_content = erb_content
    @erb_action = erb_action
    @erb_action_url = erb_action_url
    @erb_code = erb_code

    file = File.read("email.erb.html")
    out = ERB.new(file)

    if filePath.length == 0 
        filePath = fileName
    end
    
    mail = Mail.new do
        charset = "UTF-8"
        from sender
        to manager
        cc reciver
        subject erb_title
        add_file :filename => fileName, :content => File.read(filePath)
    end

    mail.html_part = out.result(binding)
    mail.charset = 'UTF-8'
    mail.content_transfer_encoding = '8bit'
    mail.deliver!
end

if(ARGV[0]) 
    if(ARGV[4])
        if(ARGV[6])
            sendQQEmail(ARGV[0],ARGV[1],ARGV[2],
            ARGV[3],
            ARGV[4],
            ARGV[5],
            ARGV[6],
            ARGV[7],
            ARGV[8],
            ARGV[9],
            ARGV[10],
            ARGV[11])

            return 1
        end

        sendQQEmail(ARGV[0],ARGV[1],ARGV[2],
        ARGV[3],
        ARGV[4],
        ARGV[5])

        return 1
    end

    sendQQEmail(ARGV[0],ARGV[1],ARGV[2])
end