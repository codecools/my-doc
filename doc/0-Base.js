◆名词&术语  
  缩写词 
    bin   binary 二进制 
    src   source 来源 
    dist  distribute 分发 
    dest  destination 目的地 
    repo  repository 仓库 
    spec  specification 说明书 
  简写词 
    IDE: 'Integrated Development Environment'集成开发环境 
    API: 'Application Programming interfaces'应用编程接口 
      目的是给应用程序与开发人员基于某软件或硬件得以访问一组例程的能力,
      无需访问源码,或理解内部工作机制的细节;
      提供了一组对象,方法和属性,可以用来访问这些技术的所有功能
      对方定义的一种信息交互的方式[Self]
  'scripting language'脚本语言 
    不具备开发操作系统的能力,而是用来编写控制其他大型应用程序的'脚本';
  'host environment'宿主环境 :语言在运行时的环境 
    对于JS,最常见的宿主环境是web浏览器,提供JS运行的环境和一些接口 
    同样作为宿主环境,NodeJS也有自己的JS引擎--V8 
  'localhost' :计算机网络中,意为'本地主机',指'这台计算机' 
    是给loopback回路网络接口的一个标准主机名;
    相对应的IP地址为'127.0.0.1'[IPv4]和'::1'[IPv6]
◆约定常识 
文件的MD5值: 为了保证每个文件的唯一性,通过判断MD5值来确定文件是否更改 
HSL 色彩模式,工业界的一种颜色标准 
  PS: 通过'H''S''L'三个颜色通道的变化及其相互叠加来得到各种颜色 
  H'hue'色调[0-360]: 代表的是人眼所能感知的颜色范围 
    颜色分布在一个平面的色相环上,取值范围是0°到360°的圆心角,每个角度可以代表一种颜色。
    六大主色作基本参照:
    360°/0° 红
    60°     黄
    120°    绿
    180°    青
    240°    蓝
    300°    洋红
    0-119   表示红区 
    120-239 表示绿区 
    240-359 表示蓝区 
  S'saturation'饱和度[0-100%]: 指的是色彩的饱和度
    用'0%-100%'的值描述了相同色相、明度下色彩纯度的变化。
    数值越大,颜色中的灰色越少,颜色越鲜艳,呈现一种从灰度到纯色的变化
  L'lightness'亮度[0-100%]: 指的是色彩的明度,作用是控制色彩的明暗变化 
    取值'0%-100%',数值越小,色彩越暗,越接近于黑色;数值越大,色彩越亮,越接近于白色
--------------------------------------------------------------------------------
编码 
  ANSI  本地编码[不代表具体的编码]
    如在简体版windows上它表示GB2312编码,繁体版windows上它表示Big5编码,
  UTF-8 
常用MIME类型 
  后缀名   MIME名称
  ◆文本 
  *.txt    text/plain    
  *.htm    text/html    
  *.html   text/html    
  *.xml    text/xml, application/xml    
  *.css    text/css
  *.csv    text/csv
  *.js     text/javascript, application/javascript    
  ◆图片 
  *.dwg    image/vnd.dwg    
  *.dxf    image/vnd.dxf
  *.gif    image/gif    
  *.jp2    image/jp2    
  *.jpe    image/jpeg
  *.jpeg   image/jpeg
  *.jpg    image/jpeg    
  *.png    image/png    
  *.svf    image/vnd.svf    
  *.tif    image/tiff    
  *.tiff   image/tiff    
  ◆音频 
  *.3gpp   audio/3gpp, video/3gpp
  *.ac3    audio/ac3
  *.au     audio/basic
  *.mp2    audio/mpeg, video/mpeg    
  *.mp3    audio/mpeg    
  *.mp4    audio/mp4, video/mp4    
  ◆视频 
  *.mpeg   video/mpeg    
  *.mpg    video/mpeg    
  ◆其他
  *.doc    application/msword    
  *.asf    allpication/vnd.ms-asf
  *.dot    application/msword    
  *.dtd    application/xml-dtd    
  *.json   application/json    
  *.mpp    application/vnd.ms-project    
  *.ogg    application/ogg, audio/ogg    
  *.pdf    application/pdf    
  *.pot    application/vnd.ms-powerpoint    
  *.pps    application/vnd.ms-powerpoint    
  *.ppt    application/vnd.ms-powerpoint    
  *.rtf    application/rtf, text/rtf    
  *.wdb    application/vnd.ms-works    
  *.wps    application/vnd.ms-works    
  *.xhtml  application/xhtml+xml    
  *.xlc    application/vnd.ms-excel    
  *.xlm    application/vnd.ms-excel    
  *.xls    application/vnd.ms-excel    
  *.xlt    application/vnd.ms-excel    
  *.xlw    application/vnd.ms-excel    
  *.xlsx   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  *.zip    aplication/zip    
URI&URL&URN 资源标识定位 
  PS: 'URL'和'URN'都是'URI'的子集
  URI'Uniform Resource Identifier'统一资源标识符 
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何[包括本地和互联网的]资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义
    Web上可用的每种资源[HTML文档、图像、视频片段、程序等]由一个通用资源标识符进行定位
  URL'Uniform Resource Locator'统一资源定位符[也叫网址] 
    PS:从互联网上得到的资源的位置和访问方法的一种简洁的表示,是互联网上标准资源的地址 
      互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它
      使用ASCII代码的一部分来表示互联网的地址,
      一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
      可以由单词组成,或者是因特网协议[IP]地址如:'162.168.1.253';
      用于定位万维网上的文档或其他数据
    'scheme://host.domain:port/path/fileName'  语法规则
      scheme  定义因特网服务的类型
        http   超文本传输协议,以'http://'开头的普通网页,不加密
        https  安全超文本传输协议,安全网页,加密所有信息交换
        ftp    文件传输协议,用于将文件下载或上传至网站
        file   本地计算机上的文件
      host    定义域主机,http的默认主机是www
      domain  定义因特网域名,如W3school.com.cn
      port    定义主机上的端口号,http的默认端口号是80
      path    定义服务器上的路径,若省略,则文档必须位于网站的根目录中
      fileName  定义文档/资源的名称
    网页地址字符编码 : 将字符转换为可通过因特网传输的格式
      URL只能使用ASCII字符集来通过因特网进行发送,
      由于URL常常会包含ASCII集合之外的字符,URL必须转换为有效的ASCII格式
      URL编码使用%其后跟随两位的十六进制数来替换非ASCII字符
      URL不能包含空格,URL编码通常使用'20%'来替换空格
    'file_path'文件路径访问
      /fileName    表示根目录下的文件
      ./filename   表示当前文件夹中的某个文件
      ../filename  表示上一层文件夹中的某个文件
      绝对路径: 提供目标文档的完整主机名称、路径信息及文档全称
      相对路径:
        同级,直接书写目标文档全称: fileName,如 boo.js;
        上一级,书写为:folderName/fileName;
        ../ 表示上一级目录; ./ 表示当前目录; / 表示相对根路径
  URN'Uniform Resource Name'通过名称来识别资源,和位置无关  
'Socket'套接字: 源IP地址及其端口号和目的IP地址及其端口号的组合称为套接字 
  用于标识客户端请求的服务器和服务,是网络通信过程中端点的抽象表示;
  包含进行网络通信必需的五种信息: 通信协议,本地IP和端口,远程IP和端口; 
HTTP'Hypertext Transfer Protocol'超文本传送协议: 计算机通过网络进行通信的规则  
  PS: 一种无状态协议,不建立持久的连接;使客户端能向服务器请求信息和服务; 
    在网络中请求和响应的数据都以二进制传输的[?]
  HTTP报文: 在HTTP应用程序之间发送的数据块 
    PS: 这些数据块以一些文本形式的元信息开头,描述报文的内容及含义,后面跟着可选的数据部分;
    由3个部分组成
      HTTP/1.0 200 OK           // start line,对报文进行描述的起始行 
      content-type: text/plain  // header,包含属性的首部块 
      content-length: 19
      // 空行 
      Hi, Im a message          //  body,可选的包含数据的主体部分 
    HTTP报文分为两类: '请求报文'和'响应报文' 
    通用首部: 客户端和服务器都可以使用 
      首部                     描述
      Connection       客户端和服务器是否保持连接,浏览器和服务器之间连接的类型
      Date             日期,报文创建时间
      Update           给出了发送端可能想要升级使用新版本或协议
      Via              显示了报文经过的中间节点（代理、网关）
      Trailer          如果报文采用分块传输编码方式,可以利用这个首部列出位于报文trailer部分的首部集合
      Trailer-Encoding 告诉接收端对报文采用什么编码格式
      Cache-Control    随报文传送缓存指示
      Pragma           早期的随报文传送指示方式
    请求首部 
      Host                接收请求服务器的主机名和端口号 
      Referer             提供了包含当前请求URI的文档的URL,告诉服务器自己来源 
        该英文的正确拼法为referrer 
      User-Agent          发起请求的客户端应用程序,浏览器的用户代理字符串 
      Accept              告诉服务器能够发送那些媒体类型,客户端能够处理的内容类型 
      Accept-Charset      客户端能识别的字符集 
      Accept-Encoding     告诉服务器能够发送那些编码
      Accept-Language     告诉服务器能够发送那些语言
      Cookie              客户端字符串
      Client-IP           客户端IP
      From                客户端邮件地址
      Expect              允许客户端列出请求所要求的服务器行为
      If-Match            如果ETag和文档当前ETag匹配,就获取文档
      If-Modified-Since   除非在某个指定日期之后修改过,否则限制这个请求
      If-None-Match       如果ETag和当前文档ETag不符合,获取资源
      If-Range            允许对文档否个范围内的条件请求
      If-Unmodified-Since 在某个指定日期之后没有修改过,否则现在请求
    响应首部 
      Content-Type     主体的MIME,返回的响应内容的类型  
      Content-Length   主体的长度或尺寸 
      Content-Encoding 主体编码格式 
      Content-Language 解析主体时适用的语言 
      Content-Base     解析主体中相对URL的基础URL 
      Content-Location 资源实际位置 
      Content-MD5      主体的MD5校验和 
      Content-Range    在整个资源中此实体部分的字节范围  
      Server           服务器应用软件名称和版本 
      Age              响应持续时间 
      Allow            列出了可用的请求方法 
      Location         告诉客户端实在在哪里,用于定向 
      ETag             主体的实体标记  
      Expires          过期时间  
      Last-Modified    实体最后一次修改时间 
  'Request'请求 
    一般由四部分组成:
    请求方法,如GET或POST请求
    请求的URL
    请求头,包含一些客户端环境信息,身份验证信息等 
    请求体,即请求正文,其中可以包含客户提交的查询字符串信息,表单信息等  
  'Response'响应 
    一般由三部分组成:
    状态码: 一个数字和文字组成的,用于表示请求的状态[是成功还是失败等] 
    响应头: 和请求头类似,包含许多的信息,如服务器类型、日期时间、内容类型和长度等
    响应体: 响应正文 
  网址的组成  
    协议: 如http、https超文本传输协议[收发的信息是文本信息] 
    主机/域名/ip地址
      ip地址: 32 位2进制的数字[四个八位的数字] 
      Example: :
        WWW.baidu.com 等网址
        WWW       子域名
        baidu.com 主域名
    端口: 一个16位的数字,范围0-65535 
      http协议默认为80,因此一般不用填写.
      1024 以下的端口是系统保留端口,需要管理员权限才能使用;
      服务器的服务程序在启动的时候会向系统注册一个端口
    路径' /.../...'等
    '#'hash: 代表网页中的一个位置,第一个'#'后的字符,会被浏览器解读为位置标识符 
      仅改变#后的部分,浏览器只会滚动到相应位置,不会重新加载网页[若无该锚点也不会滚动]
      用来指导浏览器动作的,对服务器端无用 
        HTTP请求中不包括'#'
        如访问网址,'http://www.example.com/index.html#print',
        浏览器实际发出的请求是这样的:
        GET /index.html HTTP/1.1
        Host: www.example.com
      改变#会改变浏览器的访问历史 
        PS: IE6和IE7不会因为#的改变而增加历史记录 
        改变#后的部分,会在浏览器访问历史中增加一条记录,使用"后退"按钮,可返回上个位置 
    '?'查询字符串 
      传递参数: '&'不同参数的间隔符,'='参数中键和值的连接
      清除缓存 
        'http://www.aa.com' 和 'http://www.aa.com?11'
        两个url打开的页面一样,但查询字符串不同,而认为是一个新地址,重新读取 
  URL地址字符转换 
    url的可用字符: 0-9,a-z,A-Z,其他用十六进制表示,并在每个字节前加%
    url编码:encodeURIComponent('字符')
    url解码:decodeURIComponent('字符')
  'Status Code'状态码: 表示请求的结果 
    PS:由三位数值组成,第一位表示其类别
    状态码被分为五大类：
    100-199 用于指定客户端应相应的某些动作,表示请求已接收 
    200-299 用于表示请求成功 
    300-399 重定向,表示没有成功,客户必须采取进一步的动作,
      用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息 
    400-499 客户端错误 
    500-599 服务器错误 
    ◆状态码及说明 
    100  Continue            继续 [HTTP1.1] 
      初始的请求已经接受,客户应当继续发送请求的其余部分
    101  Switching Protocols 服务器将遵从客户的请求转换到另外一种协议 [HTTP1.1] 
    ★200  OK        正常返回信息 
    201  Created   请求成功,服务器创建了新的资源,Location头给出了它的URL  
    202  Accepted  服务器已接受请求,但处理尚未完成 
    203  Non-Authoritative Information 文档已返回,可能有误 [HTTP1.1] 
      一些应答头可能不正确,因为使用的是文档的拷贝 
    204  No Content 没有新文档,浏览器应该继续显示原来的文档
      如果用户定期地刷新页面,而Servlet可以确定用户文档足够新,这个状态代码是很有用的 
    205  Reset Content 没有新的内容,但浏览器应该重置它所显示的内容 [HTTP1.1] 
      用来强制浏览器清除表单输入内容 
    206  Partial Content 客户发送了一个带有Range头的GET请求,服务器完成了它 [HTTP1.1] 
    300  Multiple Choices 客户请求的文档可以在多个位置找到 
      这些位置已经在返回的文档内列出。如果服务器要提出优先选择,则应该在Location应答头指明。
    301  Moved Permanently 客户请求的文档在其他地方
      新的URL在Location头中给出,浏览器应该自动地访问新的URL。
    302  Found   重定向,类似于301,但新的URL应该被视为临时性的替代,而不是永久性的 
      注意,在HTTP1.0 中对应的状态信息是“Moved Temporatily”。
      出现该状态代码时,浏览器能够自动访问新的URL,因此它是一个很有用的状态代码。
      注意这个状态代码有时候可以和301替换使用。
      例如,如果浏览器错误地请求http://host/~user（缺少了后面的斜杠）,
      有的服务器 返回301,有的则返回302。
      严格地说,我们只能假定只有当原来的请求是GET时浏览器才会自动重定向。请参见307 
    303  See Other 类似于301/302  [HTTP1.1]  
      不同之处在于,如果原来的请求是POST,Location头指定的重定向目标文档应该通过GET提取 
    304  Not Modified 自从上次请求后,请求的网页未修改过 
      客户端有缓冲的文档并发出了一个条件性的请求。
      一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档 
      服务器告诉客户,原来缓冲的文档还可以继续使用。
    305  Use Proxy   客户请求的文档应该通过Location头所指明的代理服务器提取 [HTTP1.1] 
    307  Temporary Redirect  和302相同 [HTTP1.1] 
      许多浏览器会错误地响应302应答进行重定向,即使原来的请求是POST,
      即使它实际上只能在POST请求的应答是303时才能重定向。
      由于这个原因,HTTP 1.1新增了307,以便更加清除地区分几个状态代码：
      当出现303应答时,浏览器可以跟随重定向的GET和POST请求；
      如果是307应答,则浏览器只能跟随对GET请求的重定向 
    ★400  Bad Request  请求出现语法错误,服务器无法理解请求的格式 
    401  Unauthorized  客户试图未经授权访问受密码保护的页面  
      响应中会包含一个WWW-Authenticate头,浏览器据此显示用户名字/密码对话框,
      然后在填写合适的Authorization头后再次发出请求。
    403  Forbidden     资源不可用,禁止访问
      服务器理解客户的请求,但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。
    ★404  Not Found     找不到匹配的资源 
    405  Method Not Allowed 请求方法对指定的资源不适用 [HTTP1.1] 
    406  Not Acceptable 类型不兼容 [HTTP1.1]  
      指定的资源已经找到,但其MIME类型和请求Accpet头中所指定的不兼容
    407  Proxy Authentication Required 类似于'401' [HTTP1.1]  
      表示客户必须先经过代理服务器的授权 
    408  Request Timeout 在服务器许可的等待时间内,客户一直没有发出任何请求 [HTTP1.1] 
      客户可以在以后重复同一请求 
    409  Conflict 由于请求和资源的当前状态相冲突,因此请求不能成功 [HTTP1.1] 
      通常和PUT请求有关 
    410  Gone 所请求的文档已经不再可用,而且服务器不知道应该重定向到哪一个地址 [HTTP1.1] 
      它和404的不同在于,返回407表示文档永久地离开了指定的位置,
      而 404表示由于未知的原因文档不可用 
    411  Length Required 服务器不能处理请求,除非客户发送一个Content-Length头 [HTTP1.1] 
    412  Precondition Failed 请求头中指定的一些前提条件失败 [HTTP1.1] 
    413  Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小 [HTTP1.1] 
      如果服务器认为自己能够稍后再处理该请求,则应该提供一个Retry-After头 
    414  Request URI Too Long URI太长 [HTTP1.1] 
    416  Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头 [HTTP1.1]  
    ★500  Internal Server Error  服务器遇到了意料不到的情况,不能完成客户的请求
      最常见的服务器端错误
    501  Not Implemented 服务器不支持实现请求所需要的功能。
      例如,客户发出了一个服务器不支持的PUT请求 
    502  Bad Gateway 服务器作为网关或者代理时,为了完成请求访问下一个服务器,但该服务器返回了非法的应答 
    503  Service Unavailable    服务器端暂时无法处理请求[可能是过载或维护] 
    504  Gateway Timeout 由作为代理或网关的服务器使用,表示不能及时地从远程服务器获得应答 [HTTP1.1] 
    505  HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本  [HTTP1.1]  
  'HTTP Method':发送请求的类型
    PS:http 1.0 定义了8种方法,主要使用'GET'和'POST';
    GET  请求
      最常见的请求类型,常用于向服务器查询信息.
      一般用于信息获取.
      使用URL传递参数.(发送的信息可见)
      对发送信息的数量有限制,一般在2000个字符内.
      必要时可将查询字符串参数追加到URL的末尾以便将信息发送给服务器.
      对于xhr而言,位于open方法的URL末尾的查询字符串必须经过正确的编码才行,
      查询字符串中每个参数的名称和值都需使用encodeURIComponent()进行编码,
      名值对必须由&分割.
    POST 请求
      通常用于向服务器发送应该被保存的数据.
      一般用于修改服务器上的资源.
      对发送信息的数量无限制.
      Remarks:
        表单提交时 Content-Type 为 application/x-www-form-urlencoded
    PUT  请求更新服务器端数据
    HEAD 检查一个对象是否存在 
      在服务器的响应中没有资源的内容,只有资源的一些基本信息
      主要用于
      1 在不获取资源的情况下获取资源信息（类型、大小等）
      2 通过状态码产看资源是否存在
      3 通过查看首部,测试资源是否被修改了
    DELETE  请求删除数据
    CONNECT 对通道提供支持
    TRACE   跟踪到服务器的路径
    OPTIONS 查询Web服务器的性能
    GET 和 POST 的区别
      大体上讲,向服务器发送客户端数据有两种方式:查询字符串和请求正文.
      通常,若是使用查询字符串,就发起了一个GET请求；
      若是使用请求正文,就发起了一个POST请求
     (若你反过来做,HTTP协议并不会阻止你,但这是没有必要的:最好在这里坚持标准实践).
      有一种普遍的误解是POST请求是安全的,而GET请求不安全.
      事实上若使用HTTPS协议,两者都是安全的；若不使用,则都不安全.
      若不使用HTTPS协议,入侵者会像查看GET请求的查询字符串一样,轻松查看POST请求的报文数据.
      使用GET请求,用户会在查询字符串中看到所有的输入数据(包括隐藏域),这是丑陋而且凌乱的.
      浏览器会限制查询字符串的长度(对请求正文没有长度限制).
      基于这些原因,一般推荐使用POST进行表单提交.
  'HTTP'和'TCP'的区别
    TPC/IP 传输层协议: 解决数据如何在网络中传输,是一种'经过三次握手'的可靠的传输方式 
    HTTP 应用层协议: 是Web联网的基础,是建立在TCP协议之上的一种应用 
  HTTP 传输过程  
    建立TCP连接 
      输入地址,然后回车
      Chrome搜索自身的DNS缓存 ,当没有找到或缓存失效时
      Chrome搜索操作系统自身的DNS缓存,若仍没找到,
      Chrome读取本地的HOST文件,若仍没找到,
      Chrome 发起一个DNS的一个系统调用 ,一般向宽带运营商查询DNS,
      宽带运营商服务器查找自身缓存,若未成功,
      运营商服务器发起一个迭代DNS解析的请求 ,逐层向上查询,
      运营商服务器把结果返回操作系统内核,同时缓存起来,
      操作系统内核把结果返回浏览器
      最终,浏览器得到 www.baidu.com 对应的ip地址,
      获取ip地址后,浏览器发起HTTP "三次握手",建立 TCP/IP 连接,
    浏览器就可以向服务器发送HTTP请求了,如get方法发送请求
      Web浏览器向Web服务器发送请求命令
      Web浏览器发送请求头信息
    服务器端接收到请求,根据路径参数,经过后端的处理之后,把结果数据发送给浏览器,如请求页面
      Web服务器发送应答信息 
      Web服务器向浏览器发送数据 
      Web服务器关闭TCP连接
    浏览器拿到完整的HTML页面代码,解析和渲染该页面,
    同时其中的JS、CSS、图片等静态资源,同样也是一个个HTTP请求都需要经过上面的步骤来获取 
    最终浏览器渲染成功呈现页面 
  HTTP 缓存 
    PS:缓存:存储指定资源的一份拷贝,并在下次请求该资源时提供该拷贝的技术 
    缓存控制--头信息 
      Expires 通过指定缓存文件过期时间来控制 [HTTP/1.0] 
        'Expire'的值是一个绝对时间点,表示缓存文件在某个时间点之前有效 
      Cache-Control: max-age=num;  [HTTP/1.1] 
        PS:请求头和响应头都支持该属性,提供的不同的值来定义缓存策略; 
          请求头的'Cache-control'优先级高于响应头中的;
          'Cache-Control'优先级高于Expires;
        'no-store'  禁止缓存,每次由客户端发起的请求都会下载完整的响应内容 
          浏览器会直接向服务器请求原始文件，并且请求中不附带 Etag 参数[服务器认为是新请求]
        'no-cache'  不缓存内容,在释放缓存内容前向服务端源地址发送请求以验证缓存是否有效 
          表示不使用Cache-Control的缓存控制方式做前置验证，
          而是使用'Etag'或者'Last-Modified'字段来控制缓存
        'private'   私有缓存,中间节点不允许缓存,响应的内容只能被唯一的用户缓存  
        'public'    公共缓存,表示响应可被任何中间节点缓存  
          如 Browser <-- proxy1 <-- proxy2 <-- Server，中间的proxy可以缓存资源，
          比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。
        max-age=num     表示当前资源的有效时间,单位s 
          时间根据系统的时间来进行判断 
        must-revalidate 缓存验证,在使用一些老的资源前强制验证状态判断其是否过期 
      Last-Modified/If-Modified-Since 配合Cache-Control使用 
        缓存过期后,当之前响应头中存在'Last-Modified'头信息, 
        请求头发出'If-Modified-Since'判断是否使用缓存, 
        服务器收到'If-Modified-Since'则与资源的最后修改时间[根据服务器时间]进行比对,
        若最后修改时间较新,说明资源被改动过,响应'304',从缓存读数据;
        若最后修改时间较旧,说明资源无新修改,响应'200',返回新数据, 
        同时通过响应头更新'last-Modified'的值,以备下次对比; 
      Etag/If-None-Match              配合Cache-Control使用 
        根据文件的MD5值来判断是否使用缓存;  
        响应头中返回'Etag'[值为资源的MD5],
        当资源过期后,请求头中发送'If-None-Match'[值为上次响应头中'Etag'的值], 
        服务器通过判断文件的MD5和请求头中的'If-None-Match'来执行响应,相同则返回'304';
        否则响应新的内容,响应头中附带新的'Etag' 
      Pragma  [HTTP/1.0] 
        PS:响应头不支持该属性,通常定义'Pragma'以向后兼容基于HTTP/1.0 的客户端 
        no-cache  通知客户端不要对该资源进行缓存 
    无法被浏览器缓存的请求 
      浏览器发出的第一个请求的资源默认是不被缓存的; 
      HTTP信息头中包含Cache-Control:no-cache,
      pragma:no-cache,
      或Cache-Control:max-age=0 等告诉浏览器不用缓存的请求
      需要根据Cookie,认证信息等决定输入内容的动态请求是不能被缓存的
      POST请求无法被缓存
      HTTP响应头中不包含Last-Modified/Etag,也不包含Cache-Control/Expires的请求无法被缓存
    不使用缓存的方法 
      使用查询字符串来避免缓存,缓存以URL为依据 [古老的方法] 
--------------------------------------------------------------------------------
数据结构 
  数据结构就是存储数据的方式
  队列
  栈
  链表
    将零散的东西连起来,从而进行有序的操作.
    Example:
      // 定义零散的东西
      var Node =function(e){
        this.element =e;
        this.next =null
      }
      var n1 =new Node(1);
      var n2 =new Node(2);
      var n3 =new Node(3);
      // 建立关系,连起来
      n1.next = n2;
      n2.next = n3;
      // 将零散东西输出
      var n = n1;
      while(n != null){
        console.log('遍历链表',n.element);
        n = n.next;
      }
  哈希表
    哈希表就是用 字符串 当下标,也就是 JS 中的对象的实现方式
    也是其他语言中的 字典
  树
  集合
  图
    如 点 线 互联 求路线
算法 
  复杂度 :对一个操作复杂程度的大致估计 
    五种常见时间复杂度 : 消耗的时间
    O(1)     常数复杂度,比如读取数组中的某一个元素
    O(logN)  比如二分搜索,常用于有序列表的查找
    O(N)     比如数组的遍历
    O(NlogN) 两个有序列表求交集,使用二分搜索
    O(N^2)   两个列表求交集
    空间复杂度 : 占用的内存
    O(1)     在数组中返回某一个元素
    O(N)     复制一个数组并返回
  15 个经典基础算法 
    Hash
    快速排序
    快递选择SELECT
    BFS/DFS （广度/深度优先遍历）
    红黑树 （一种自平衡的二叉查找树）
    KMP 字符串匹配算法
    DP (动态规划 dynamic programming)
    A*寻路算法: 求解最短路径
    Dijkstra:最短路径算法 
    遗传算法
    启发式搜索
    图像特征提取之SIFT算法
    傅立叶变换
    SPFA(shortest path faster algorithm) 单元最短路径算法
  算法设计思想 
    迭代法
    穷举搜索法
    递推法
    动态规划
    贪心算法
    回溯
    分治算法
二叉树 
--------------------------------------------------------------------------------
  

