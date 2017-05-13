Cocos Creator 
介绍 
  一个完整的游戏开发解决方案,包括了 cocos2d-x 引擎的 JavaScript 实现,
  以及更快速开发游戏所需要的各种图形界面工具;
  包含游戏引擎、资源管理、场景编辑、游戏预览和发布等游戏开发所需的全套功能,
  并且将所有的功能和工具链都整合在了一个统一的应用程序里;
  目前支持发布游戏到Web、Android和iOS,以及点开即玩原生性能的Cocos Play手机页游平台;
  以数据驱动和组件化作为核心的游戏开发方式
  场景中的内容按照工作流分别呈现在 资源管理器、层级管理器、场景编辑器、属性检查器 四个核心面板中
说明 
  默认单位 
    时间 s,秒
    尺寸 px,像素
  项目结构 
    通过 Dashboard,创建项目之后,有特定的文件夹结构;
    初次创建并打开一个 Cocos Creator 项目后,您的项目文件夹将会包括以下结构：
    ProjectName（项目文件夹）
    ├──assets
    ├──library
    ├──local
    ├──settings
    ├──temp
    └──project.json
    assets,资源文件夹
      assets 将会用来放置您游戏中所有本地资源、脚本和第三方库文件。
      只有在 assets 目录下的内容才能显示在 资源管理器 中。
      assets 中的每个文件在导入项目后都会生成一个相同名字的 .meta 文件,
      用于存储该文件作为资源导入后的信息和与其他资源的关联。
      一些第三方工具生成的工程或设计原文件, 如 Photoshop 的 .psd 文件,
      可以选择放在 assets 外面来管理。
    library,资源库
      library 是将 assets 中的资源导入后生成的,
      在这里文件的结构和资源的格式将被处理成最终游戏发布时需要的形式。
      若您使用版本控制系统管理您的项目,这个文件夹是不需要进入版本控制的。
      当 library 丢失或损坏的时候,只要删除整个 library 文件夹再打开项目,就会重新生成资源库。
    local,本地设置
      local 文件夹中包含该项目的本地设置,包括编辑器面板布局,窗口大小,位置等信息。
      您不需要关心这里的内容,只要按照您的习惯设置编辑器布局,这些就会自动保存在这个文件夹。
      一般 local 也不需要进入版本控制。
    settings,项目设置
      settings 里保存项目相关的设置,如 构建发布 菜单里的包名、场景和平台选择等。
      这些设置需要和项目一起进行版本控制。
    project.json
      project.json 文件和 assets 文件夹一起,作为验证 Cocos Creator 项目合法性的标志。
      只有包括了这两个内容的文件夹才能作为 Cocos Creator 项目打开。
      而 project.json 本身目前只用来规定当前使用的引擎类型和插件存储位置,不需要用户关心其内容。
      这个文件也应该纳入版本控制。
  术语
组件化开发 
  PS：脚本以组件的形式添加到节点上
  脚本的一般形式
    cc.Class({
      extends: cc.Component, // 继承至cc.Component
      properties: {     // 定义引用的节点或自定义的属性
        aoo : {         // 节点引用的完整写法
           default: null,      // 节点的默认值
           url: cc.Texture2D,  // 可选,
           serializable: true, // 可选,默认为true 
           visible: true,      // 可选,默认为true
           displayName: 'Foo', // 可选,
           readonly: false,    // 可选,默认为false
          //  ...
        },
        boo : cc.Label, // 表明节点的类别,节点引用的简写方式
        coo : 'hello world', // 自定义属性
        // 当属性为字符串、数值等非引用类型时,可忽略其类型声明
        
      },
      
      onLoad: function () {  // 场景加载后自动执行,一般用于放置初始化代码
        // 函数中this表示..,
        // properties也处于其原型链上,也会去properties上查找属性方法
        var aoo = this.boo.parent; // 获取boo节点的父节点
        this.posAR.string = 'abc'; //  设置文本节点的文本值
      },
      
      update: function (dt) {  // 循环执行,约15ms调用一次
        
      },
    });
API 
  节点相关 
    ◆节点类型
    cc.Label  文本
    cc.Node   节点
    cc.SpriteFrame 图片资源
    ◆节点属性
    ccNode.string  可读写,节点的文本值
    ccNode.parent  节点的父节点
    ◆创建节点
    cc.instantiate(prefa)  返回通过预置资源创建的节点
Cocos2d-js API
--------------------------------------------------------------------------------
菜单栏
toolbar,工具栏 
  PS：包括了场景编辑工具和预览游戏时的操作按钮;
    左边为场景编辑的相关工具,如移动、旋转、缩放等工具按钮
    右边显示了远程测试和调试时使用访问地址,以及连接中的设备数;
    位于编辑器主窗口的正上方,包含了五组控制按钮或信息,
    用来为特定面板提供编辑功能或方便我们实施工作流。
  transform tool,选择变换工具 
    为 场景编辑器 提供编辑节点变换属性（位置、旋转、缩放、尺寸）的功能
  preview,预览
    运行预览：点击后在浏览器中运行当前编辑的场景。
    刷新设备：在所有正在连接本机预览游戏的设备上重新加载当前场景
      （包括本机浏览器和其他链接本机的移动端设备）。
  preview url
    这里显示运行 Cocos Creator 的桌面电脑的局域网地址,
    连接同一局域网的移动设备可以访问这个地址来预览和调试游戏。
  open project,打开项目文件夹
    在操作系统的文件管理器（Explorer 或 Finder）打开项目所在的文件夹。  
资源管理器：访问和管理项目资源的工作区域
  PS：显示了项目资源文件夹「assets」中的所有资源,
    包括项目中所有的资源和脚本文件;为每个资源分配UUID,解决改名和移动时的索引问题;
    项目中只有 assets 目录下的资源才会被 Cocos Creator 导入项目并进行管理;
    图片文件导入后会经过简单的处理成texture类型资源,可将其拖拽到场景或组件属性中使用;
    资源列表中的文件会隐藏扩展名,而以图标指示文件或资源的类型;
    图片资源:目前包括 jpg, png 等图像文件,图标会显示为图片的缩略图
    拖拽移动放置资源;
    删除资源是不可撤销的操作,无法从回收站（Windows）或废纸篓（Mac）找回
  目前可以在资源管理器中创建的资源：
    PS：点击创建按钮,弹出创建资源菜单;点击其中的项目就会在当前选中的位置新建相应资源;
    文件夹   在资源管理器中以folder图标显示,除了文件夹之外列表中显示的都是资源文件
    脚本文件 通过编辑这些脚本为添加组件功能和游戏逻辑
    场景     双击可打开的场景文件,打开场景文件后才能继续进行内容创作和生产
    动画剪辑 
  Scene 游戏场景 
    PS：Scene是开发时组织游戏内容的中心,也是呈现给玩家所有游戏内容的载体。
      一般包括：Sprite、Label、角色及游戏逻辑脚本「以组件形式附加在场景节点上」;
      当运行游戏时,就会载入Scene,载入后就会自动运行所包含组件的游戏脚本,
      实现各种各样开发者设置的逻辑功能;
      除了资源以外,Scene是一切内容创作的基础;
    创建、打开Scene
      在资源管理器中选择目录确定创建的位置;
      点击左上角的加号-Scene,创建Scene
      双击Scene,在场景编辑器和层级编辑器中打开该场景
    Canvas 
      Scene就是以Canvas为基础支持的;
      Canvas可以被称为画布节点或渲染根节点,场景图像都会放在Canvas节点下
    修改场景资源自动释放策略
      PS：从当前场景切换到下一个场景时,若当前场景不自动释放资源,
        则该场景中直接或间接引用到的所有资源（脚本动态加载的不算）,默认都不主动释放。
        反之若启用了自动释放,则这些引用到的资源默认都会自动释放。
        若项目中的场景很多,随着新场景的切换,内存占用就会不断上升。
      配置自动释放
        除了使用 cc.loader.release 等API来精确释放资源外,还可使用场景的自动释放功能;
        在资源管理器中选中场景,在属性检查器中勾选“自动释放资源”选项「该项默认关闭」
      已知问题：
        粒子系统的 plist 所引用的贴图不会被自动释放。
        若要自动释放粒子贴图,请从 plist 中移除贴图信息,改用粒子组件的 Texture 属性来指定贴图。
      防止特定资源被自动释放
        某个场景的启用资源自动释放后,若脚本中保存了该场景的资源引用,
        当场景切换后,这些资源就会变成非法的,很容易出错。
        或者若调用 cc.game.addPersistRootNode 方法让某个该场景中的节点保留到下一个场景,
        但这个节点及其子节点用到的所有资源也还是会被同时释放,导致下个场景不能再正确访问这些资源;
        为了让这部分资源在场景切换时不被释放,可以使用 cc.loader.setAutoRelease 或者 cc.loader.setAutoReleaseRecursively 来保留这些资源。
      修改场景加载策略
        选中指定场景,在 属性检查器 中看到“延迟加载资源”选项,该项默认关闭。
        加载场景时,若这个选项关闭,则这个场景直接或间接递归依赖的所有资源都将被加载,
        全部加载完成后才会触发场景切换。
      延迟加载资源
        加载场景时,若选项开启,
        则该场景直接或间接依赖的所有贴图、粒子和声音都将被延迟到场景切换后才加载,
        使场景切换速度极大提升。
        同时,玩家进入场景后可能会看到一些资源陆续显示出来,
        并且激活新界面时也可能会看到界面中的元素陆续显示出来,因此这种加载方式更适合网页游戏。
        使用这种加载方式后,为了能在场景中更快地显示需要的资源,
        建议一开始就让场景中暂时不需要显示的渲染组件（如 Sprite）保持非激活状态。
        Spine 和 TiledMap 依赖的资源永远都不会被延迟加载。      
  Texture, 图像资源 
    PS：图像资源又经常被称作贴图、图片,是游戏中绝大部分图像渲染的数据源。
      图像资源一般由图像处理软件「如PS」制作而成并输出成cc可以使用的文件格式,
      目前包括 JPG 和 PNG 两种。
      在 资源管理器 中选中图像资源后,属性检查器 下方会显示该图片的缩略图。
      目前图像资源的属性设置功能还没有完善,请不要在 属性检查器 手动修改图像资源的属性设置。
    SpriteFrame 资源类型
      每个图像资源导入后编辑器会自动在它下面创建同名的 SpriteFrame 资源。
      SpriteFrame 是核心渲染组件 Sprite 所使用的资源,
      设置或替换 Sprite 组件中的 spriteFrame 属性,就可以切换显示的图像。
      Atlas类型:包含多个 SpriteFrame 的图集资源
    使用 SpriteFrame
      直接将 SpriteFrame 或图像资源从 资源管理器 中拖拽到 层级管理器 或 场景编辑器 中,
      就可直接用所选的图像在场景中创建 Sprite 节点。
      之后拖拽其他的 SpriteFrame 或图像资源到该 Sprite 组件的 Sprite Frame 属性栏中,
      来切换该 Sprite 显示的图像。
      在 动画编辑器 中也可以拖拽 SpriteFrame 资源到已创建好的 Sprite Frame 动画轨道上;
    性能优化注意事项
      使用单独存在的 Texture 作为 Sprite 资源,在预览和发布游戏时,
      将无法对这些 Sprite 进行批量渲染优化的操作。
      目前编辑器不支持转换原有的单张 Texture 引用到 Atlas 里的 SpriteFrame 引用,
      所以在开发正式项目时,应该尽早把需要使用的图片合成 Atlas（图集）,
      并通过 Atlas 里的 SpriteFrame 引用使用。
    Atlas,图集资源
      PS：也称作 Sprite Sheet,是游戏开发中常见的一种美术资源。
        图集是通过专门的工具将多张图片合并成一张大图,并通过 plist 等格式的文件索引的资源。
        可供 Cocos Creator 使用的图集资源由 plist 和 png 文件组成。
        在游戏中使用多张图片合成的图集作为美术资源,有以下优势：
        合成图集时会去除每张图片周围的空白区域,加上可以在整体上实施各种优化算法,合成图集后可以大大减少游戏包体和内存占用
        多个 Sprite 如果渲染的是来自同一张图集的图片时,这些 Sprite 可以使用同一个渲染批次来处理,大大减少 CPU 的运算时间,提高运行效率。
      制作图集资源
        要生成图集,首先您应该准备好一组原始图片：
        接下来可以使用专门的软件生成图集,我们推荐的图集制作软件包括：
        TexturePacker、 Zwoptex
        使用这些软件生成图集时请选择 cocos2d-x 格式的 plist 文件。
        最终得到的图集文件是同名的 plist 和 png。
      导入图集资源
        将的 plist 和 png 文件同时拖拽到 资源管理器 中,
        就可以生成可以在编辑器和脚本中使用的图集资源了。
      Atlas 和 SpriteFrame
        导入图集资源后,Atlas里包含了很多类型为 SpriteFrame 的子资源,
        每个子资源都是可以单独使用和引用的图片。
      碎图转图集和拆分合并图集工作流程
        在项目原型阶段或生产初期,美术资源的内容和结构变化都会比较频繁,
        我们通常会直接使用碎图（也就是多个单独的图片）来搭建场景和制作 UI。
        在之后为了优化性能和节约包体,需要将碎图合并成图集,或者将图集中的内容进行拆分或合并。
      目前我们提供了一个简单的小工具来完成场景中对图片资源引用从碎图或老图集到新图集的重定向。
        生成新图集：不管是从碎图合并,还是将原来的图集重新拆分或合并,您都需要先使用 TexturePacker 生成完整的新图集。然后将新图集导入到项目资源文件夹中。
        双击打开您需要重定向资源引用的场景或 Prefab
        点击主菜单的「开发者->在当前场景使用指定图集替换 spriteFrame...」,在打开的对话框里选择您新生成的图集,等待替换操作完成。（如果新图集有多张,应该重复这一步直到所有相关新图集都替换完毕） 4.如果您有多个场景或 prefab,需要重复执行 2-3 步,遍历每个相关的场景或 Prefab
        确认所有相关图片资源的引用都已经替换成了新图集后,现在可以删除原有的碎图或旧图集了。      
    Auto_Atlas,自动图集资源
      cc自带的合图功能,可将指定的一系列碎图打包成一张大图,
      具体作用和 Texture Packer 的功能很相近。
      创建自动图集资源
        右键 -> 新建 -> 自动图集配置,点击新建一个类似 AutoAtlas.pac 的资源。
        自动图集资源 将会以当前文件夹下的所有 SpriteFrame 作为碎图资源,
        以后会增加其他的选择碎图资源的方式。 
        如果碎图资源 SpriteFrame 有进行配置过,在打包后重新生成的 SpriteFrame 将会保留这些配置。
      配置自动图集资源
        PS：在资源管理器中选中一个 自动图集资源 后,
          属性检查器 面板将会显示 自动图集资源 的所有可配置项。
        Max Width  单张图集最大宽度
        Max Height 单张图集最大高度
        Padding    图集中碎图之间的间距
        Allow Rotation 是否允许旋转碎图
        Force Squared  是否强制将图集长宽大小设置成正方形
        PowerOfTwo     是否将图集长宽大小设置为二次方倍数
        Heuristices    图集打包策略
          BestShortSideFit
          BestLongSideFit,
          BestAreaFit
          BottomLeftRule
          ContactPointRule
        Format 图集图片生成格式 「可选的格式有png, jpg, webp」
          配置完成后可以点击 预览 按钮来预览打包的结果,
          按照当前自动图集配置生成的相关结果将会展示在 属性检查器 下面的区域。
          需要注意的是每次配置过后,需要重新点击 预览 才会重新生成预览信息。
        结果：
        Packed Textures, 显示打包后的图集图片以及图片相关的信息,如果会生成的图片有多张,则会往下在 属性检查器 中列出来。
        Unpacked Textures,显示不能打包进图集的碎图资源,造成的原因有可能是这些碎图资源的大小比图集资源的大小还大导致的,这时候可能需要调整下图集的配置或者碎图的大小了。
      生成图集
        预览项目或者在 Cocos Creator 中使用碎图的时候都是直接使用的碎图资源,
        在 构建项目 这一步才会真正生成图集到项目中。 
        生成的大图将会放在 构建目录 下的 res/raw-assets 相对于项目中 assets 目录结构下的对应的目录中,
        以 AutoAtlas-xx.png 结构命名。 
        生成项目后可以到对应的目录下检查对应的图集资源是否生成成功了。
  脚本资源 
    PS： 在 Cocos Creator 中,脚本也是资源的一部分;
      可在资源编辑器中创建 JavaScript 或者 CoffeeScript 脚本资源
      脚本名称就是组件的名称,且大小写敏感;
      通常在assets下创建一script文件夹来存放JS脚本;
    编写脚本 
      PS：打开的脚本里会预置一些代码,这些代码就是编写一个组件脚本所需的结构,
        具有这样结构的脚本就是 Cocos Creator 中的组件,
        能够挂载到场景中的节点上,提供控制节点的各种功能;
        代码中不需关心 properties 中数值是多少,因为之后可直接在属性检查器中设置;
        当编辑完脚本并保存,Cocos Creator 会自动检测到脚本的改动,并迅速编译;
        一份简单的组件脚本如下：
        cc.Class({
            extends: cc.Component,
            properties: { },
            onLoad: function () { },
            update: function (dt) { },
        });
      使用 cc.Class 声明类型
        PS：cc.Class 是一个很常用的 API,用于声明 Cocos Creator 中的类,
          为了方便区分,把使用 cc.Class 声明的类叫做 CCClass。
      定义 CCClass 
        调用 cc.Class,传入一个原型对象,
        在原型对象中以键值对的形式设定所需的类型参数,就能创建出所需要的类。
        e.g.: 用 cc.Class 创建一个类型,并且赋给了 Sprite 变量
          同时还将类名设为 "sprite",类名用于序列化,一般可以省略。
          var Sprite = cc.Class({
            name: "sprite"
          });
      实例化 直接 new 一个对象：
        var obj = new Sprite();
      判断类型 可用 JavaScript 的 instanceof：
        cc.log(obj instanceof Sprite);       // true
      使用 ctor 声明构造函数：
        var Sprite = cc.Class({
          ctor: function () {
            cc.log(this instanceof Sprite);    // true
          }
        });
      实例方法 
        var Sprite = cc.Class({
          // 声明一个名叫 "print" 的实例方法
          print: function () { }
        });
      使用 extends 实现继承：
        var Shape = cc.Class(); // 父类
        var Rect = cc.Class({ // 子类
          extends: Shape
        });
      父构造函数
        继承后,CCClass 会统一自动调用父构造函数,你不需要显式调用。
        var Shape = cc.Class({
          ctor: function () {  // 实例化时,父构造函数会自动调用,
            cc.log("Shape");    
          }
        });
        var Rect = cc.Class({
          extends: Shape
        });
        var Square = cc.Class({
          extends: Rect,
          ctor: function () {  // 再调用子构造函数
            cc.log("Square");   
          }
        });
        var square = new Square();
        依次输出 "Shape" 和 "Square"。
      声明属性
        PS：通过在脚本中声明的属性,可将脚本组件中的字段可视化地展示在 属性检查器 中,
          从而方便地在场景中调整属性值。
          要声明属性,仅需要在 cc.Class 定义的 properties 字段中,
          填写属性名字和属性参数即可
        e.g.：
          cc.Class({
            extends: cc.Component,
            properties: {
              userID: 20,
              userName: "Foobar"
            }
          });
        cc中两种形式的属性声明方法
          简单声明 在多数情况下,都可以使用简单声明。
            当声明的属性为基本 JavaScript 类型时,可以直接赋予默认值：
            properties: {
              height: 20,       // number
              type: "actor",    // string
              loaded: false,    // boolean                
              target: null,     // object
            }
            当声明的属性具备类型时（如：cc.Node,cc.Vec2 等）,
            可在声明处填写他们的构造函数来完成声明,
            properties: {
              target: cc.Node,
              pos: cc.Vec2,
            }
            当声明属性的类型继承自 cc.ValueType 时（如：cc.Vec2,cc.Color 或 cc.Rect）,
            除了上面的构造函数,还可以直接使用实例作为默认值：
            properties: {
              pos: new cc.Vec2(10, 20),
              color: new cc.Color(255, 255, 255, 128),
            }
            当声明属性是一个数组时,可以在声明处填写他们的类型或构造函数来完成声明,如：
            properties: {
              any: [],      // 不定义具体类型的数组
              bools: [cc.Boolean],
              strings: [cc.String],
              floats: [cc.Float],
              ints: [cc.Integer],
              
              values: [cc.Vec2],
              nodes: [cc.Node],
              frames: [cc.SpriteFrame],
            }
            除了以上几种情况,其他类型我们都需要使用完整声明的方式来进行书写。
          完整声明
            有时,需为属性声明添加参数,控制属性在 属性检查器 中的显示方式,
            以及属性在场景序列化过程中的行为;
            properties: {
              score: {
                default: 0, // 默认值为 0
                displayName: "Score (player)",
                // 在 属性检查器 里,其属性名将显示为：“Score (player)”,
                tooltip: "The score of player",
                // 当鼠标移到参数上时,显示对应的 Tooltip。
              }
            }
            ◆常用参数：
              更多的属性参数,查阅 属性参数
            default 设置属性的默认值,仅在组件第一次添加到节点上时才会用到
            type    限定属性的数据类型,详见 CCClass 进阶参考：type 参数
            visible 设为 false 则不在 属性检查器 面板中显示该属性
            serializable 设为 false 则不序列化（保存）该属性
            displayName  在 属性检查器 面板中显示成指定名字
            tooltip      在 属性检查器 面板中添加属性的 Tooltip
          数组声明
            数组的 default 必须设置为 [],
            如果要在 属性检查器 中编辑,还需要设置 type 为构造函数,枚举,
            或者 cc.Integer,cc.Float,cc.Boolean 和 cc.String。
            properties: {
              names: {
                default: [],
                type: [cc.String]   // 用 type 指定数组的每个元素都是字符串类型
              },
              enemies: {
                default: [],
                type: [cc.Node]     // type 同样写成数组,提高代码可读性
              },
            }
          get/set 声明
            在属性中设置了 get 或 set 以后,访问属性的时候,
            就能触发预定义的 get 或 set 方法。
            若只定义 get 方法,那相当于属性只读。
            properties: {
              width: {
                get: function () {
                  return this._width;
                },
                set: function (value) {
                  this._width = value;
                }
              }
            }
      访问节点和组件
        PS：可在 属性检查器 里修改节点和组件,也能在脚本中动态修改。
          动态修改的好处是能够在一段时间内连续地修改属性、过渡属性,实现渐变效果。
          脚本还能够响应玩家输入,能够修改、创建和销毁节点或组件,实现各种各样的游戏逻辑。
          要实现这些效果,你需要先在脚本中获得你要修改的节点或组件。
        this.node 获得组件所在的节点
          在组件方法里访问  
          start: function () {
            var node = this.node;
            node.x = 100;
          }
        getComponent 获得同一个节点上的其它组件
          start: function () {
            var label = this.getComponent(cc.Label);
            var text = this.name + ' started';
            label.string = text;  // Change the text in Label Component
          }
          也可为 getComponent 传入一个类名「脚本文件名」
            var label = this.getComponent("cc.Label");
            对用户定义的组件而言,类名就是脚本文件名,并且区分大小写。
            例如 "SinRotate.js" 里声明的组件,类名就是 "SinRotate"。
            var rotate = this.getComponent("SinRotate");
          在节点上也有一个 getComponent 方法,它们的作用是一样的：
            start: function () {
              var bool = this.node.getComponent(cc.Label) === this.getComponent(cc.Label)
              cc.log(bool);  // true
            }
          如果在节点上找不到指定的组件,getComponent 将返回 null,
            如果你尝试访问 null 的值,将会在运行时抛出 "TypeError" 这个错误。
            因此如果不确定组件是否存在,可判断一下：
            start: function () {
              var label = this.getComponent(cc.Label);
              if (label) {
                label.string = "Hello";
              }
              else {
                cc.error("Something wrong?");
              }
            }
        获得其它节点及其组件  --todo
          PS：脚本通常还需要进行多个节点之间的交互。
            例如,一门自动瞄准玩家的大炮,就需要不断获取玩家的最新位置。
            Cocos Creator 提供了一些不同的方法来获得其它节点或组件。
          利用属性检查器设置节点
            最直接的方式就是在 属性检查器 中设置你需要的对象。
            以节点为例,只需要在脚本中声明一个 type 为 cc.Node 的属性：
            // Cannon.js
            cc.Class({
              extends: cc.Component,
              properties: {
                player: {  // 声明一个 player 属性
                  default: null, // 默认值为 null
                  type: cc.Node  // 对象类型为 cc.Node
                }
              }
            });
            // 相当于在其它语言里声明了 public cc.Node player = null;
            接着就可将层级管理器上的任意一个节点拖到该 Player 控件;
            建立引用后,就可直接在脚本里访问 player 节点了.
            // Cannon.js
            var Player = require("Player");
            cc.Class({
              extends: cc.Component,
              properties: {
                player: { // 声明 player 属性
                  default: null,
                  type: cc.Node
                }
              },
              start: function () {
                var playerComp = this.player.getComponent(Player);
                this.checkPlayer(playerComp);
              },
              // ...
            });
          利用属性检查器设置组件
            拖动节点 "Player Node" 到 属性检查器,
            player 属性就会被设置为这个节点里面的 Player 组件。
            这样就不需要再自己调用 getComponent 啦。
            // Cannon.js
            var Player = require("Player");
            cc.Class({
              extends: cc.Component,
              properties: {
                player: {   // 声明 player 属性,这次直接是组件类型
                  default: null,
                  type: Player
                }
              },
              start: function () {
                var playerComp = this.player;
                this.checkPlayer(playerComp);
              },
              // ...
            });
            还可以将属性的默认值由 null 改为数组[],这样就能在 属性检查器 中同时设置多个对象。
            不过如果需要在运行时动态获取其它对象,还需要用到下面介绍的查找方法。
        查找子节点 
          PS：有时候,游戏场景中会有很多个相同类型的对象,像是炮塔、敌人和特效,
            它们通常都有一个全局的脚本来统一管理。
            如果用 属性检查器 来一个一个将它们关联到这个脚本上,那工作就会很繁琐。
            为了更好地统一管理这些对象,我们可以把它们放到一个统一的父物体下,
            然后通过父物体来获得所有的子物体：
          getChildren  cc.Node 原有的一个 API,可以获得一个包含所有子节点的数组。
            // CannonManager.js
            cc.Class({
              extends: cc.Component,
              start: function () {
                this.cannons = [];
                this.cannons = this.node.getChildren();
              }
            });
          getChildByName() 
            this.node.getChildByName("Cannon 01");
          cc.find  根据传入的路径进行逐级查找 
            如果子节点的层次较深,可使用 cc.find 
            cc.find("Cannon 01/Barrel/SFX", this.node);
            当 cc.find 只传入第一个参数时,将从场景根节点开始逐级查找：
            this.backNode = cc.find("Canvas/Menu/Back");
      访问已有变量里的值
        如果你已经在一个地方保存了节点或组件的引用,你也可以直接访问它们,一般有两种方式：
        通过全局变量访问
          PS：谨慎地使用全局变量,并不推荐滥用全局变量,即使要用也最好保证全局变量只读 
            由于所有脚本都强制声明为 "use strict",因此定义全局变量时的 window. 不可省略;
            访问全局变量时,如果变量未定义将会抛出异常。
            添加全局变量时,请小心不要和系统已有的全局变量重名。
            你需要小心确保全局变量使用之前都已初始化和赋值。
          定义一个全局对象 window.Global
          // Globals.js, this file can have any name
          window.Global = {
            // 包含了 backNode 和 backLabel 两个属性
            backNode: null,
            backLabel: null,
          };
          可在合适的地方直接访问并初始化 Global:
          // Back.js
          cc.Class({
            extends: cc.Component,
            onLoad: function () {
              Global.backNode = this.node;
              Global.backLabel = this.getComponent(cc.Label);
            }
          });
          初始化后,你就能在任何地方访问到 Global 里的值：
          // AnyScript.js
          cc.Class({
            extends: cc.Component,
            
            // start 会在 onLoad 之后执行,所以这时 Global 已经初始化过了
            start: function () {
              var text = 'Back';
              Global.backLabel.string = text;
            }
          });
        通过模块访问
          可使用 require 来实现脚本的跨文件操作
          每个脚本都能用 require + 文件名「不含路径」 来获取到对方 export 的对象
          更详细内容,请参考 模块化。
          // Global.js, now the filename matters
          module.exports = {
            backNode: null,
            backLabel: null,
          };
          // Back.js
          // this feels more safe since you know where the object comes from
          var Global = require("Global");
          cc.Class({
            extends: cc.Component,
            onLoad: function () {
              Global.backNode = this.node;
              Global.backLabel = this.getComponent(cc.Label);
            }
          });
          // AnyScript.js
          // this feels more safe since you know where the object comes from
          var Global = require("Global");
          cc.Class({
            extends: cc.Component,
            // start 会在 onLoad 之后执行,所以这时 Global 已经初始化过了
            start: function () {
              var text = "Back";
              Global.backLabel.string = text;
            }
          });
      常用节点和组件接口
        节点状态和层级操作
          假设我们在一个组件脚本中,通过 this.node 访问当前脚本所在节点。
          this.node.active = false;  关闭节点 
            该操作会关闭节点,当该节点的所有父节点都激活,将意味着：
            在场景中隐藏该节点和所有子节点
            该节点和所有子节点上的所有组件都将被禁用,
            也就是不会再执行这些组件中的 update 中的代码
            这些组件上如果有 onDisable 方法,这些方法将被执行
          this.node.active = true;   激活节点 
            该操作会激活节点,当该节点的所有父节点都激活,将意味着：
            在场景中重新激活该节点和所有子节点,除非子节点单独设置过关闭
            该节点和所有 active 的子节点上的所有 enabled 的组件都会被启用,
            他们中的 update 方法之后每帧会执行
            这些组件上如果有 onEnable 方法,这些方法将被执行
          更改节点的父节点
            假设父节点为 parentNode,子节点为 this.node
            parentNode.addChild(this.node)
            或
            this.node.parent = parentNode
            这两种方法是等价的。
            注意,通过 创建和销毁节点 介绍的方法创建出新节点后,
            要为节点设置一个父节点才能正确完成节点的初始化。
        索引节点的子节点
          this.node.children 将返回节点的所有子节点数组。
          this.node.childrenCount 将返回节点的子节点数量。
          注意 以上两个 API 都只会返回节点的直接子节点,不会返回子节点的子节点。
        更改节点位置
          分别对 x 轴和 y 轴坐标赋值：
          this.node.x = 100; this.node.y = 50;
        设置 position 变量：
          this.node.position = cc.p(0, 0);
          使用 setPosition 方法：
          node.setPosition(cc.p(0, 0)); node.setPosition(0, 0);
          以上两种用法等价。
        更改节点旋转
          this.node.rotation = 90;
          或
          this.node.setRotation(90);
        更改节点缩放
          this.node.scaleX = 2; this.node.scaleY = 2;
          或
          this.node.setScale(2); this.node.setScale(2, 2);
          以上两种方法等价。setScale 传入单个参数时,会同时修改 scaleX 和 scaleY。
        更改节点尺寸
          this.node.setContentSize(100, 100); 
          this.node.setContentSize(cc.p(100, 100));
          或
          this.node.width = 100; 
          this.node.height = 100;
          以上两种方式等价。
        更改节点锚点位置
          this.node.anchorX = 1; 
          this.node.anchorY = 0;
          或
          this.node.setAnchorPoint(1, 0);
          注意以上这些修改变换的方法会影响到节点上挂载的渲染组件,
          比如 Sprite 图片的尺寸、旋转等等。
        颜色和不透明度
          在使用 Sprite, Label 这些基本的渲染组件时,要
          注意修改颜色和不透明度的操作只能在节点的实例上进行,
          因为这些渲染组件本身并没有设置颜色和不透明度的接口。
          
          假如我们有一个 Sprite 的实例为 mySprite,如果需要设置它的颜色：
          mySprite.node.color = cc.Color.RED;
          设置不透明度：
          mySprite.node.opacity = 128;
      cc.Component 所有组件的基类
        任何组件都包括如下的常见接口「假设我们在该组件的脚本中,以 this 指代本组件」
        this.node    该组件所属的节点实例
        this.enabled 是否每帧执行该组件的 update 方法,同时也用来控制渲染组件是否显示
        update(dt)   作为组件的成员方法,在组件的 enabled 属性为 true 时,其中的代码会每帧执行
        onLoad()     组件所在节点进行初始化时（创建之后通过设置父节点添加到节点树）执行
        start()      会在该组件第一次update前执行,通常用于需要在onLoad初始化完毕后执行的逻辑。
        更多组件成员方法请继续参考 生命周期回调 文档。          
      生命周期回调
        Cocos Creator 为组件脚本提供了生命周期的回调函数。
        只要指定回调函数,Creator 就会在特定的时期自动执行相关 脚本,不需要手动调用。
        onLoad 回调会在这个组件所在的场景被载入 的时候触发,
          组件脚本的初始化阶段,我们提供了 onLoad 回调函数。
          在 onLoad 阶段,保证了你可以获取到场景中的其他节点,以及节点关联的资源数据。
          通常 我们会在 onLoad 阶段去做一些初始化相关的操作。
          例如：
          cc.Class({
            extends: cc.Component,
            properties: {
              bulletSprite: cc.SpriteFrame,
              gun: cc.Node,
            },
            onLoad: function () {
              this._bulletRect = this.bulletSprite.getRect();
              this.gun = cc.find('hand/weapon', this.node);
            },
          });
        start 回调函数会在组件第一次激活前
          也就是第一次执行 update 之前触发。
          start 通常用于 初始化一些中间状态的数据,
          这些数据可能在 update 时会发生改变,并且被频繁的 enable 和 disable。
          cc.Class({
            extends: cc.Component,
            
            start: function () {
              this._timer = 0.0;
            },
            
            update: function (dt) {
              this._timer += dt;
              if ( this._timer >= 10.0 ) {
                console.log('I am done!');
                this.enabled = false;
              }
            },
          });
        update  游戏开发的一个关键点是在每一帧渲染前更新物体的行为,状态和方位。
          这些更新操作通常都放在 update 回调中。
          cc.Class({
            extends: cc.Component,
            
            update: function (dt) {
              this.node.setPosition( 0.0, 40.0 * dt );
            }
          });
        lateUpdate  在所有组件的 update 都执行完之后才进行操作
          update 会在所有动画更新前执行,但如果我们要在动画更新之后才进行一些额外操作,
          那就需要用到 lateUpdate 回调。
          cc.Class({
            extends: cc.Component,
            
            lateUpdate: function (dt) {
              this.node.rotation = 20;
            }
          });
        onEnable   当组件的 enabled 属性从 false 变为 true 时,会激活 onEnable 回调。
          倘若节点第一次被 创建且 enabled 为 true,则会在 onLoad 之后,start 之前被调用。
        onDisable 当组件的 enabled 属性从 true 变为 false 时,会激活 onDisable 回调。
        onDestroy 当组件调用了 destroy(),会在该帧结束被统一回收,此时会调用 onDestroy 回调。
      创建和销毁节点
        创建新节点
          除了通过场景编辑器创建节点外,我们也可以在脚本中动态创建节点。
          通过 new cc.Node() 并将它加入 到场景中,可以实现整个创建过程。
          以下是一个简单的例子:
          cc.Class({
            extends: cc.Component,
            properties: {
              sprite: {
                default: null,
                type: cc.SpriteFrame,
              },
            },
            start: function () {
              var node = new cc.Node('sprite ' + this.count);
              var sp = node.addComponent(cc.Sprite);
              
              sp.spriteFrame = this.sprite;
              node.parent = this.node;
              node.setPosition(0,0);
            },
          });
        克隆已有节点
          有时我们希望动态的克隆场景中的已有节点,我们可以通过 cc.instantiate 方法完成。
          cc.Class({
            extends: cc.Component,
            
            properties: {
              target: {
                default: null,
                type: cc.Node,
              },
            },
            
            start: function () {
              var scene = cc.director.getScene();
              var node = cc.instantiate(this.target);
              
              node.parent = scene;
              node.setPosition(0,0);
            },
          });
        创建预制节点
          和克隆已有节点相似,你也设置你的预制（prefab）节点并通过 cc.instantiate 生成。
          cc.Class({
            extends: cc.Component,
            
            properties: {
              target: {
                default: null,
                type: cc.Prefab,
              },
            },
            
            start: function () {
              var scene = cc.director.getScene();
              var node = cc.instantiate(this.target);
              
              node.parent = scene;
              node.setPosition(0,0);
            },
          });
        销毁节点
          通过 node.destroy() 函数,可以销毁节点。
          销毁节点并不会立刻发生,而是在当前 帧逻辑更新结束后,统一执行。
          当一个节点销毁后,该节点就处于无效状态,
          可以通过 cc.isValid 判断 当前节点是否已经被销毁。
          cc.Class({
            extends: cc.Component,
            
            properties: {
              target: cc.Node,
            },
            
            start: function () {
              setTimeout(function () {
                this.target.destroy();
              }.bind(this), 5000);
            },
            
            update: function (dt) {
              if ( !cc.isValid(this.target) ) {
                this.enabled = false;
                return;
              }
              
              this.target.rotation += dt * 10.0;
            },
          });
      加载和切换场景
          在 Cocos Creator 中,使用场景文件名「可不包含扩展名」来索引指代场景。
          cc.director.loadScene('MyScene'); 通过常驻节点进行场景资源管理和参数传递
          cc.game.addPersistRootNode(myNode) 常驻节点
            通常同时只会加载运行一个场景,当切换场景时,默认会将场景内所有节点和其他实例销毁。
            如果需要用一个组件控制所有场景的加载,或在场景之间传递参数数据,
            就需要将该组件所在节点标记为「常驻节点」,使它在场景切换时不被自动销毁,常驻内存。
            将 myNode 变为常驻节点,这样挂在上面的组件都可以在场景之间持续作用,
            可以用这样的方法来储存玩家信息,或下一个场景初始化时需要的各种数据。
          cc.game.removePersistRootNode(myNode) 取消一个节点的常驻属性
          除此之外,简单的数值类数据传递也可以使用全局变量的方式进行,
            详见通过全局变量跨组件访问值。
          场景加载回调
            加载场景时,可以附加一个参数用来指定场景加载后的回调函数：
            cc.director.loadScene('MyScene', cfoo);
            cfoo 就是声明在本脚本中的一个回调函数,
            在场景加载后可以用来进一步的进行初始化或数据传递的操作。
            由于回调函数只能写在本脚本中,所以场景加载回调通常用来配合常驻节点,
            在常驻节点上挂载的脚本中使用。
          预加载场景
            有些时候我们需要在后台静默加载新场景,并在加载完成后手动进行切换。
            cc.director.preloadScene 对场景进行预加载
              cc.director.preloadScene('table', function () {
                cc.log('Next scene preloaded');
              });
            之后在合适的时间调用 loadScene, 就可以立即切换场景
            cc.director.loadScene  在加载场景之后自动切换运行新场景,
            cc.director.loadScene('table');
          
            注意 使用预加载场景资源配合 runScene 的方式进行预加载场景的方法已被废除:
            // 请不要再使用下面的方法预加载场景!
            cc.loader.loadRes('MyScene.fire', function(err, res) {
              cc.director.runScene(res.scene); 
            });        
    把脚本组件添加到需要控制的节点上 
      将脚本添加到场景节点中,实际上就是为这个节点添加一份组件;
      在层级编辑器中选中节点,在属性检查器中添加 用户脚本组件 并引用对应的JS脚本;
      也可以通过直接拖拽脚本资源到 属性检查器 的方式来添加脚本;
  LabelAtlas,艺术数字资源 
    一种用户自定义的资源,它可以用来配置艺术数字字体的属性。
    创建艺术数字资源
      右键 -> 新建 -> 艺术数字配置,新建一个类似 LabelAtlas.labelatlas 的资源。
      艺术数字资源 在使用之前需要进行一些配置,
      比如关联渲染的图片资源,设置每一个字符的宽高和起始字符信息。
    配置艺术数字资源
      选中 艺术数字资源 后,在属性检查器中进行配置
      配置完成后需要点击 属性检查器 右上角的绿色的打勾按钮来保存设置。
      Raw Texture File 指定渲染图片
      Item Width       指定每一个字符的宽度
      Item Height      指定每一个字符的高度
      Start Char       指定艺术数字字体里面的第一个字符
        如果字符是 Space,也需要在这个属性里面输入空格字符
    使用艺术数字资源
      新建一个 Label 组件,然后把新建好的艺术数字资源拖到 Label 组件的 Font 属性即可。
  Prefab,预制资源 
    创建及使用Prefab
      将在场景中编辑好节点从 层级管理器 拖到 资源管理器,即创建出了一预制资源,
      在脚本中引用Prefab后,就可以动态生成节点内容了
    自动同步和手动同步
      每个场景中的预制实例都可以选择要自动同步和还是手动同步。
      设为手动同步时,当预制对应的原始资源被修改后,场景中的预制实例不会同步刷新,
      只有在用户手动还原预制时才会刷新。
      设为自动同步时,该预制实例会自动和原始资源保持同步。
      注意,为了保持引擎的精简,自动同步的预制实例有如下限制：
      
      场景中的预制实例仅能修改预制的根节点自身的 name、active、position 和 rotation 属性,
      其它子节点和所有组件都必须和原始资源保持一致,否则编辑器会询问是要撤销修改还是要更新原始资源。
      自动同步的预制中的组件无法引用该预制外的其它对象,否则编辑器会弹出提示。
      自动同步的预制外面的组件只能引用该预制的根节点,无法引用组件和子节点,否则编辑器会弹出提示。
      这些限制都仅影响编辑器操作,运行时不影响。
    将预制还原成普通节点
      从 资源管理器 中删除一个预制资源后,你可以将场景中对应的预制实例还原成普通节点。
      方法是选中预制实例,然后点击菜单 节点 > 还原成普通节点。      
  字体资源
    PS：cc中可以使用三类字体资源：系统字体,动态字体和位图字体。
      其中系统字体是通过调用游戏运行平台自带的系统字体来渲染文字,
      不需要用户在项目中添加任何相关资源。
      字体资源需要通过 Label 组件来渲染
    动态字体
      支持 TTF 格式的动态字体。
      只要将扩展名为 TTF 的字体文件拖拽到 资源管理器 中,即可完成字体资源的导入。
    位图字体
      位图字体由 fnt 格式的字体文件和一张 png 图片组成,
      fnt 文件提供了对每一个字符小图的索引。
      这种格式的字体可以由专门的软件生成,请参考位图字体制作工具。
      在导入位图字体时,请务必将 fnt 文件和 png 文件同时拖拽到 资源管理器 中。
      注意 为了提高资源管理效率,建议将导入的 fnt 和 png 文件存放在单独的目录下,
      不要和其他资源混在一起。
    关联字体资源
      将字体资源拖拽到创建的 Label 组件中的 File 属性栏中
      这时场景中的字体会立刻用刚才指定的字体资源进行渲染。
      切换字体文件时,Label 组件的其他属性不受影响。
      如果要恢复使用系统字体,可以点击 Use System Font 的属性复选框,
      来清除 File 属性中指定的字体文件。
      另外一种快捷使用指定资源创建字体节点的方法,
      是直接从 资源管理器 中拖拽字体文件（TTF 或位图字体都可以）到 层级管理器 中。
      使用拖拽方式创建的文字节点会自动使用拖拽的字体资源来设置 Label 组件的 File 属性。
    位图字体合并渲染
      如果位图字体使用的贴图和其他 Sprite 使用的贴图是同一张,
      而且位图字体和 Sprite 之间没有插入使用其他贴图的渲染对象时,
      位图字体就可以和 Sprite 合并渲染批次。
      在放置位图字体资源时,请把 .fnt 文件、.png 文件和 Sprite 所使用的贴图文件放在一个文件夹下,
      然后参考 自动图集工作流程 将位图字体的贴图和 Sprite 使用的贴图打包成一个图集,
      即可在原生和 WebGL 渲染环境下自动享受位图字体合并渲染的性能提升。
  ParticleSystem,粒子资源
    Cocos2d 支持 .plist 的格式文件的粒子资源
    为了提高资源管理效率,建议将导入的plist和png「若使用了贴图」文件存放在单独的目录下;
    渲染错误解决方法
      粒子使用的 png 贴图文件或 base64 格式的内置图片文件可能会有不正确的预乘信息,
      导致渲染出的粒子不能正确显示透明区域。
      如果出现这种情况,请手动修改粒子 plist 文件中的 blendFuncSource 属性到下面的值：
      <key>blendFuncSource</key>
      <integer>770</integer>
  声音资源: 就是简单的音频文件 
    PS：引擎通过各个平台提供的基础接口,播放不同的声音资源来实现游戏内的背景音乐和音效。
    声音的加载模式「只影响 Web 上的加载效果」
      PS：由于各个 Web 平台实现标准的进度不一致,所以提供了两种声音资源的加载方式。
      WebAudio：在引擎内是以一个 buffer 的形式缓存的
        默认方式,只有在不支持的浏览器才会使用 dom 元素加载播放
        优点：兼容性好,问题比较少
        缺点：占用的内存资源过多
      DOM Audio：通过生成一个标准的  audio 元素播放声音
        在某些浏览器上可能遇到一些限制。
        如每次播放必须是用户操作事件内才允许播放「WebAudio 只要求第一次」,
        只允许播放一个声音资源等。
        强制使用 dom element 加载：
        cc.load.load('raw-assets/resources/background.mp3', callback);
        音频在加载过程中,会读取 url 内的 get 参数。
        其中只需要定义一个 useDom 参数,使其有一个非空的值。 
        cc.load.load('raw-assets/resources/background.mp3?useDom=1', callback);
        这样在 audioDownloader 中,就会强制使用 DOM element 的方式加载播放这个音频。
        需要注意的是,如果使用 dom element 加载的音频,在 cc.load 的 cache 中,
        缓存的 url 也会带有 ?useDom=1 建议不要直接填写资源的 url 
        尽量在脚本内定义一个 AudioClip,然后从编辑器内定义。
      手动选择按某种解析方式加载音频
        有时候我们可能不会使用场景的自动加载或是预加载功能,
        而是希望自己手动控制 cc.load 资源的加载流程。 
        这个时候我们也是可以通过音频资源的 url 来选择加载的方式。
  Spine,骨骼动画资源：由 Spine所导出的数据格式 
    骨骼动画所需资源有： .json,骨骼数据; .png,图集纹理; .txt/.atlas,图集数据
    骨骼动画资源对应属性检查器中 Spine 组件的 Skeleton Data 属性
  DragonBones,骨骼动画资源：由 DragonBones 编辑导出的数据格式 
    PS：DragonBones 骨骼动画资源有： .json 骨骼数据; .json 图集数据; .png 图集纹理
      对应属性检查器中 DragonBones 组件的 Dragon Asset 属性;
      为提高资源管理效率,建议将导入的资源文件存放在单独的目录下;
  TiledMap,地图资源
    地图所需资源有：
      .tmx 地图数据; 
      .png 图集纹理; 
      .tsx tileset 数据配置文件「部分 tmx 文件需要」
    对应属性检查器中 TiledMap 组件的 Tmx File 属性
    为了提高资源管理效率,建议将导入的 tmx, tsx 和 png 文件存放在单独的目录下;
  .meta 资源配置文件
    PS：所有 assets 路径下的资源都会在导入时生成一份 资源配置文件「.meta」,
      这份配置文件提供了该资源在项目中的唯一标识（uuid）,
      以及其他的一些配置信息（如图集中的小图引用,贴图资源的裁剪数据等）;
      在编辑器中管理资源时,meta 文件是不可见的,
      对资源的任意删除、改名、移动操作,都会由编辑器自动同步相应的 meta 文件,
      确保 uuid 的引用不会丢失和错乱。
      注意在编辑器外部的文件系统中（Explorer,Finder）对资源文件进行删除、改名、移动时,
      必须同步处理相应的 meta 文件。
      资源文件和其对应的 meta 文件应该保持在同一个目录下,而且文件名相同。
    处理无法匹配的资源配置文件
      若您在编辑器外部的文件系统「Explorer,Finder等」中进行了资源文件的移动或重命名,
      而没有同步移动或重命名 meta 文件时,会导致编辑器将改名或移动的资源当做新的资源导入,
      可能会出现场景和组件中对该资源（包括脚本）的引用丢失。
      在编辑器发现有未同步的资源配置文件时,会弹窗警告用户,并列出所有不匹配的 meta 文件。
      这时无法正确匹配的资源配置文件会从项目资源路径（asset）中移除,并自动备份到 temp 路径下。
      若您希望恢复这些资源的引用,请将备份的 meta 文件复制到已经移动过的资源文件同一路径下,
      并保证资源文件和 meta 文件的文件名相同。
      注意编辑器在处理资源改名和移动时会生成新的 meta 文件,
      这些新生成的 meta 文件可以在恢复备份的 meta 后安全删除。
node_library,控件库 
  PS：预设控件的仓库,可以通过拖拽方式添加到场景中;
    且可将自定义的预制资源「prefab」添加到控件库,方便再次使用;
    简单直接的可视化控件仓库,拖拽控件到场景编辑器或层级管理器中,快速完成预设控件的创建;
    控件库 里包含的控件内容和主菜单中的 节点 菜单里可以添加的预设节点是一致的,
    但通过控件库创建新节点更加方便快捷。
  内置控件： 编辑器内置的预设节点
    可快速生成包括默认资源的精灵（Sprite）、包含背景图和文字标题的按钮（Button）
    以及已经配置好内容和滚动条的滚动视图（ScrollView）等
  自定义控件： 收集用户自己建立的预制资源「Prefab」,方便重复多次创建和使用。
    从 资源管理器 中拖拽相应的预制资源（Prefab）到自定义控件分页,即可完成创建
场景编辑器：用来展示和编辑场景中可视内容的工作区域 
  PS：所见即所得的场景搭建工作都依靠场景编辑器中的显示来完成
    内容创作的核心工作区域,使用它选择和摆放场景图像、角色、特效、UI 等各类游戏元素。
    可以获得所见即所得的场景效果预览。
  说明 
    场景视图的背景会显示一组标尺和网格,表示世界坐标系中各个点的位置信息。
    读数为(0,0)的点为场景中世界坐标系的原点。
    使用鼠标滚轮缩小视图显示时,每一个刻度代表100像素的距离。
    根据当前视图缩放尺度的不同,会在不同刻度上显示代表该点到原点距离的数字,单位都是像素。
    视图中的紫色线框表示场景中默认会显示的内容区域,这块区域的大小由设计分辨率决定。
    鼠标悬浮到场景中的节点上时,节点的约束框将会以灰色单线显示出来。
    节点在鼠标悬浮或选中状态下都能够看到约束框（灰色或蓝色的线框）,
    约束框的矩形区域表示节点的尺寸（size）属性大小。
    即使节点没有包含图像渲染组件（如Sprite）,也可以为节点设置size属性,
    而节点约束框以内的透明区域都可以被鼠标悬浮和点击选中。
    选中的节点周围将会有蓝色的线框提示节点的约束框。
    鼠标悬浮在节点上时,与节点的约束框同时显示的还有节点的名称
  相关操作 
    鼠标右键拖拽：平移视图, 
    鼠标滚轮：以当前鼠标悬停位置为中心缩放视图。
    按住鼠标左键并拖拽,框选节点;
    选中多个节点后,进行的任何变换操作都会同时作用于所有选中的节点。
  对齐节点
    场景编辑器 左上角有一排按钮可以用来在选中多个节点时对齐这些节点
    假设三个 Label 节点都已经选中,从左到右的对齐按钮会依次将这些节点：
    按照最靠近上面的边界对齐
    按照整体的水平中线对齐
    按照最靠近下面的边界对齐
    按照最靠近左边的边界对齐
    按照整体的垂直中线对齐
    按照最靠近右边的边界对齐
    要注意对齐操作不管是一开始测定左右边界和中线还是之后将每个节点对齐时的参照,
    都是节点约束框的中心或某条边界,而不是节点的位置坐标。
  快捷键 
    W    激活移动变换工具
    E    激活旋转变换工具
    R    激活缩放变换工具
    T    激活矩形变换工具
  Cocos Creator 坐标系
    和 OpenGL 坐标系相同,起源于笛卡尔坐标系「x 向右,y 向上,z 向外」
    iOS, Android, Windows Phone 等平台原生 SDK 开发时用的是标准屏幕坐标系,
    标准屏幕坐标系原点为屏幕左上角,x 向右,y 向下
    OpenGL 坐标系,原点为屏幕左下角,x 向右,y 向上;
  World Coordinate,世界坐标系 和 Local Coordinate,本地坐标系 
    世界坐标系也叫做绝对坐标系,在 Cocos Creator 游戏开发中表示场景空间内的统一坐标体系,
    「世界」就用来表示我们的游戏场景。
    本地坐标系也叫相对坐标系,是和节点相关联的坐标系。
    每个节点都有独立的坐标系,当节点移动或改变方向时,
    和该节点关联的坐标系将随之移动或改变方向。
    修改节点的 位置（Position）属性设定的节点位置就是该节点相对于父节点的本地坐标系;
Node_Tree,层级管理器：用树状列表形式展示场景中的所有节点和他们的层级关系 
  PS：可直接将资源管理器中的图像拖动到层级管理器上「节点会自动以贴图资源文件名来命名」,
    同级后序节点的渲染顺序会在其前节点后「显示在上层」,子节点也永远显示在父节点上层,
    可随时调整节点的层级顺序和关系来控制显示顺序;
    点击来选中节点,被选中的节点会以蓝底色高亮显示。
    当前选中的节点会在场景编辑器中显示蓝色边框,并更新属性检查器中的内容。
  创建节点 
    PS：在层级管理器中有两种方法可以创建节点：
    点击左上角的 + 按钮,或右键点击鼠标并进入右键菜单中的创建节点子菜单。
    从资源管理器中拖拽图片、字体或粒子等资源到层级管理器中。
  节点和组件 
    PS：以组合而非继承的方式进行实体的构建;
      在 Cocos Creator 中,节点「Node」是承载组件的实体,
      通过将具有各种功能的组件「Component」挂载到节点上,
      让节点具有各式各样的表现和功能
  使用 Canvas 作为渲染根节点
    Canvas 节点是推荐使用的 渲染根节点,即所有渲染相关的节点都放在 Canvas 下面
    Canvas 能提供多分辨率自适应的缩放功能,
    Canvas 的默认锚点位置是 (0.5, 0.5),
    加上 Canvas 节点会根据屏幕大小自动居中显示,
    所以 Canvas 下的节点会以屏幕中心作为坐标系的原点。
    可以直接删除 Canvas 节点,并使用偏好的设置策略
  逻辑节点
    除了有具体图像渲染任务的节点之外,
    还会有一部分节点只负责挂载脚本,执行逻辑,不包含任何渲染相关内容。
    通常将这些节点放置在场景根层级,和 Canvas 节点并列,如下图所示：
  空节点
    空节点可以作为组织其他节点的容器,也可以用来挂载用户编写的逻辑和控制组件。
  渲染节点
    如 Sprite（精灵）、Label（文字）、ParticleSystem（粒子）、Tilemap（瓦片图）等
    由节点和基础渲染组件组成的节点类型
    法用其他组件的组合来代替的,因此单独归为 渲染 类别。
    要注意每个节点上只能添加一个渲染组件,重复添加会导致报错。
    但是可以通过将不同渲染节点组合起来的方式实现更复杂的界面控件,
    如 UI 类中的很多控件节点
  UI 节点
    包括 Button、Widget、Layout、ScrollView、EditBox（输入框）等节点
    大部分都是由渲染节点组合而成的;
  快捷键
    Ctrl + F  在场景编辑器中聚焦选中的节点
    Ctrl + D  在该节点相同位置复制一个同样的节点
Properties,属性检查器：查看并编辑当前选中节点的组件属性的工作区域 
  PS：可在一个节点上添加多个组件,来为节点添加更多功能;
    但一个节点上只能添加一个渲染组件
    不同类型的属性在属性检查器中有不同的控件外观和编辑方式。
  相关操作 
    为节点添加组件功能: 点击添加组件按钮,从类别中选择相应的组件即可
    快捷操作
      为节点添加脚本组件: 将js文件拖到该面板,即将当前节点和脚本进行绑定
        然后再在面板中指定脚本properties中引入的其他节点或属性
  节点激活开关和节点名称
    左上角的复选框表示节点的激活状态, 
    使用节点处于非激活状态时,节点上所有图像渲染相关的组件都会被关闭,
    整个节点包括子节点就会被有效的隐藏。
  Node,节点属性组件 
    PS：修改节点的属性通常可以立刻在场景编辑器中看到节点的外观或位置变化
    Position,位置
      由 x 和 y 两个属性组成,分别规定了节点在当前坐标系 x 轴和 y 轴上的坐标。
    Anchor,锚点  默认在节点中心
      决定了节点以自身约束框中的哪一个点作为整个节点的位置。
      锚点由 anchorX 和 anchorY 两个值表示
      ,他们是通过节点尺寸计算锚点位置的乘数因子,范围都是 0 ~ 1 之间。
      (0.5, 0.5) 表示锚点位于节点长度乘 0.5 和宽度乘 0.5 的地方,即节点的中心
      锚点属性设为 (0, 0) 时,锚点位于节点本地坐标系的初始原点位置,也就是节点约束框的左下角。
      锚点位置确定后,所有子节点就会以 锚点所在位置 作为坐标系原点;
    Color,颜色
    Opacity,不透明度 
      还会作用于子节点,可以通过节点的 Opacity 实现一组节点内容的淡入淡出效果
    Design Resolution 规定了游戏的设计分辨率
    Fit Height和Fit Width 规定了在不同尺寸的屏幕上运行时,将如何缩放节点以适配不同的分辨率
    Rotation,旋转
      角度值为正时,节点顺时针旋转,角度值为负时,节点逆时针旋转。
    Scale,缩放 
      一组乘数因子,由 scaleX 和 scaleY 两个值组成,分别表示节点在 x 轴和 y 轴的缩放倍率。
      子节点上设置的缩放属性会和父节点叠加作用,
      子节点的子节点会将每一层级的缩放属性全部相乘来获得在世界坐标系下显示的缩放倍率,
    Size,尺寸
      属性由 Width和 Height两个值组成,用来规定节点的约束框大小。
      对于 Sprite 节点来说,约束框的大小也就相当于显示图像的大小。
  ◆渲染组件
  Spirte,精灵 场景图像组件  「Spirte节点特征组件」 
    PS：游戏中最常见的显示图像的方式;
      在面板中添加 Sprite 组件,就可以在场景中显示项目资源中的图片;
      只有图片类型的节点才能添加该组件
    Atlas        显示图片资源「spriteFrame」所属的图集资源 
      若拖拽的 SpriteFrame 资源是包含在一个 Atlas 图集资源中,
      那么 Sprite 的Atlas属性也会被一起设置。
      之后可点击Atlas属性的选择按钮来从该 Atlas 中挑选 SpriteFrame 指定给 Sprite;
    Sprite Frame 渲染Sprite使用的图片资源 
      可从资源管理器中拖拽 Texture 或 SpriteFrame 类型的资源到该属性引用中,
      即可通过Sprite组件显示资源图像;
    Type         渲染模式
      Simple 普通
        按照原始图片资源样子渲染 Sprite,在这个模式下一般不会手动修改节点的尺寸,
        保证场景中显示的图像和美术人员生产的图片比例一致。
      Sliced 九宫格
        图像将被分割成九宫格,并按照一定规则进行缩放以适应可随意设置的尺寸(size)。
        通常用于 UI 元素,或将缩放不影响质量的图片制作成九宫格图来节省游戏资源空间。
      Tiled  平铺
        当 Sprite 的尺寸增大时,图像不会被拉伸,而是会按照原始图片的大小不断重复,
        就像平铺瓦片一样将原始图片铺满整个 Sprite 规定的大小;
      Filled 填充
        PS：根据原点和填充模式的设置,按照一定的方向和比例绘制原始图片的一部分; 
          Type 属性选择填充模式后,会出现一组新的属性可供配置;
          经常用于进度条的动态展示;
        Fill Type  填充类型选择
        HORIZONTAL 横向填充
        VERTICAL   纵向填充
        RADIAL     扇形填充
        Fill Start  填充起始位置的标准化数值「从 0 ~ 1,表示填充总量的百分比」
          选择横向填充时,Fill Start 设为 0,就会从图像最左边开始填充
        Fill Range  填充范围的标准化数值「0 ~ 1 之间」
          设为 1,就会填充最多整个原始图像的范围。
          在 HORIZONTAL 和 VERTICAL 这两种填充类型下,
            Fill Start 设置的数值将影响填充总量,
            若 Fill Start 设为 0.5,那么即使 Fill Range 设为 1.0,
            实际填充的范围也仍然只有 Sprite 总大小的一半。
          而 RADIAL 类型中 Fill Start 只决定开始填充的方向,
            Fill Start 为 0 时,从 x 轴正方向开始填充,
            Fill Range 决定填充总量,值为 1 时将填充整个圆形。
            Fill Range 为正值时逆时针填充,为负值时顺时针填充。
        Fill Center 填充中心点,只有选择了 RADIAL 类型才会出现这个属性
          决定扇形填充时会环绕 Sprite 上的哪个点,坐标系和设置 Anchor 锚点 一样
    Size Mode    指定 Sprite 的尺寸
      PS：手动修改size属性后,Size Mode会被自动设置为Custom,除非再次指定为前两种尺寸;
      Trimmed  使用原始图片资源裁剪透明像素后的尺寸
      Raw      使用原始图片未经裁剪的尺寸
      Custom   自定义尺寸
        用户在使用 矩形变换工具 拖拽改变节点的尺寸, 或通过修改 Size 属性,
        或在脚本中修改 width 或 height 后,都会自动将 Size Mode 设为 CUSTOM。
        表示用户将自己决定节点的尺寸,而不需要考虑原始图片的大小。      
    Trimmed Mode 是否渲染原始图像周围的透明像素区域
      详情请参考图像资源的自动剪裁。
    Src Blend Factor 当前图像混合模式
    Dst Blend Factor 背景图像混合模式
      和Src Blend Factor属性共同作用,可以将前景和背景 Sprite 用不同的方式混合渲染,
      效果预览可以参考 glBlendFunc Tool
    Trim   勾选后将在渲染 Sprite 图像时去除图像周围的透明像素
      取消勾选,Sprite 节点的约束框会包括透明像素的部分。
  Label,文本  文本组件      「Label节点特征组件」 
    PS：用来显示一段文字,文字可以是系统字体,TrueType 字体或者 BMFont 字体和艺术数字;
      Label 还具有排版功能;
    String           文本内容字符串
    Horizontal Align 文本的水平对齐方式 「LEFT,CENTER 和 RIGHT」
    Vertical Align   文本的垂直对齐方式 「TOP,CENTER 和 BOTTOM」
    Font Size        文本字体大小「单位 Point,磅」
    Line Height      文本的行高「单位 Point,磅」
    Overflow         排版模式 
      None 
      Clamp     超出约束框的部分被隐藏
        自动换行开启时下,优先进行换行显示,当仍显示不完时隐藏超出部分
      Shrink    自动缩小「不会自动放大,最大显示 Font Size 规定的尺寸」
        自动换行开启时,优先换行,仍显示不完时,进行自动缩小
      Resize_Height 自适应高度
        用户无法手动修改文本的高度,文本的高度由内部算法自动计算出来
    Enable_Wrap_Text 文本自动换行 「与Overflow有关」
      中英文自动换行存在差异,英文是以单词为单位进行换行的,
      必须有空格才能作为换行调整的最小单位。
      中文是以字为单位进行换行,每个字都可以单独调整换行。
    Font             指定文本渲染需要的字体文件, 若使用系统字体,则此属性可以为空
      可通过拖拽 TTF 字体文件和 BMFont 字体文件来修改渲染的字体类型;
      若不想继续使用字体文件,可以通过勾选Use System Font来重新启用系统字体
      使用艺术数字字体需要创建艺术数字资源,参考链接中的文档设置好艺术数字资源的属性之后,
      就可以像使用 BMFont 资源一样来使用艺术数字了。
    Use System Font  布尔值,是否使用系统字体
    BMFont 与 UI 合图自动批处理 
      从 Creator 1.4 版本开始, BMFont 支持与 UI 一起合图进行批量渲染。 
      理论上, 若你的游戏 UI 没有使用系统字体或者 TTF 字体,
      并且所有的 UI 图片资源都可以合在一张图上,
      那么 UI 是可以只用一个 Draw Call 来完成的。 
      更多关于 BMFont 与 UI 合图自动批处理的内容,请参考 BMFont 与 UI 合图自动批处理    
    文字节点的锚点
      文字节点的锚点和文字在约束框中的对齐模式是需要区分的两个概念。
      在需要靠文字内容将约束框撑大的排版模式中（如 Resize Height）,
      要正确设置锚点位置,才能让约束框向我们期望的方向延伸。
      如果希望文字约束框向下延伸,需要将锚点（Anchor）的 y 属性设为 1。
  Particle,粒子 
  ◆布局组件
  Widget 对齐挂件,布局组件,实现多分辨率自适应排版 
    PS：能使当前节点自动对齐到父物体的任意位置,或者约束尺寸,让游戏适配不同分辨率
      对齐挂件的脚本接口请参考Widget API
      通过 Widget 组件开启一个或多个对齐参考后,
      节点的位置（position）和尺寸（width,height）属性可能会被限制,
      不能通过 API 或动画系统自由修改。
    Position布局
      默认使用px,可使用百分比﹪
      若左右同时对齐,或者上下同时对齐,那么在相应方向上的尺寸就会被拉伸;
      Top    对齐上边界,用于设定当前节点的上边界和父物体的上边界之间的距离
      Bottom 对齐下边界,用于设定当前节点的下边界和父物体的下边界之间的距离
      Left   对齐左边界,用于设定当前节点的左边界和父物体的左边界之间的距离
      Right  对齐右边界,用于设定当前节点的右边界和父物体的右边界之间的距离
    HorizontalCenter 水平方向居中 
    VerticalCenter   竖直方向居中 
    Target    对齐目标,指定对齐参照的节点,未指定时默认使用父节点
    AlignOnce 默认为true,是否仅在组件初始化时进行一次对齐
      设为 false 时,每帧都会对当前 Widget 组件执行对齐逻辑「对性能有较大损耗！」
      组件所在节点的位置和尺寸属性可能会被限制,不能通过 API 或动画系统自由修改。
      因为通过 Widget 对齐是在每帧的最后阶段进行处理的,
      因此对 Widget 组件中已经设置了对齐的相关属性进行设置,
      最后都会被 Widget 组件本身的更新所重置。
      若需要同时满足对齐策略和可以在运行时改变位置和尺寸的需要,可以通过以下两种方式实现：
        在初始化时自动完成对齐,然后就可以通过 API 或动画系统对 UI 进行移动变换
        通过调用 Widget 组件的对齐边距 API,包括 top, bottom, left, right,
        直接修改 Widget 所在节点的位置或某一轴向的拉伸。
        这些属性也可以在动画编辑器中添加相应关键帧,保证对齐的同时实现各种丰富的 UI 动画。
  Layout 一种容器组件,容器内子节点布局 「Layout节点所属属性」 
    PS：方便制作列表、翻页等功能
      Layout（自动布局）组件可以挂载在任何节点上,
      将节点变成一个有自动布局功能的容器。
      所谓自动布局容器,就是能够自动将子节点按照一定规律排列,
      并可以根据节点内容的约束框总和调整自身尺寸的容器型节点。
    Type       布局类型 
      NONE       默认值,表示容器不会修改子节点的大小和位置 
        当用户手动摆放子节点时,容器会以能够容纳所有子节点的最小矩形区域作为自身的大小
      Horizontal 水平
        Layout Type 设为 Horizontal 时,所有子节点都会自动横向排列,并根据子节点的宽度（Width）总和设置 Layout 节点的宽度。上图中 Layout 包括的两个 Label 节点就自动被横向排列。
        
        水平布局模式下,Layout 组件不会干涉节点在 y 轴上的位置或高度属性,子节点甚至可以放置在 Layout 节点的约束框高度范围之外。如果需要子节点在 y 轴向上对齐,可以在子节点上添加 Widget 组件,并开启 Top 或 Bottom 的对齐模式。
      Vertical   垂直
        Layout Type 设为 Vertical 时,所有子节点都会自动纵向排列,并根据子节点的高度（Height）总和设置 Layout 节点的高度。
        
        垂直布局模式下,Layout 组件也不会修改节点在 x 轴的位置或宽度属性,子节点需要添加 Widget 并开启 Left 或 Right 对齐模式才能规整的排列。
      GRID       网格布局
        Cell Size   指定网格容器里面排版元素的大小
        Start Axis  指定网格容器里面元素排版指定的起始方向轴
    ResizeMode 缩放模式 
      NONE      子节点和容器的大小变化互不影响
      CONTAINER 容器变化,容器的大小会随着子节点的大小变化
      CHILDREN  内容变化,子节点大小会随着容器的大小而变化
    Padding边距 
      PaddingLeft   子节点相对于容器左边框的距离 
      PaddingRight  子节点相对于容器右边框的距离 
      PaddingTop    子节点相对于容器上边框的距离 
      PaddingBottom 子节点相对于容器下边框的距离 
    SpacingX  子节点间水平方向上的间距
    SpacingY  子节点间垂直方向上的间距
    Horizontal Direction 子节点水平排列方向 
      当容器为 Grid 类型时,此属性和 Start Axis 属性一起决定 Grid 布局元素的起始水平排列方向。
      可以设置 Left to Right 或 Right to Left 两种方向,前者会按照节点在 层级管理器 中显示顺序从左到右排列；后者会按照节点显示从右到左排列。
    Vertical Direction   子节点垂直排列方向 
      当容器为 Grid 类型时,此属性和 Start Axis 属性一起决定 Grid 布局元素的起始垂直排列方向。
      可以设置 Top to Bottom 或 Bottom to Top 两种方向。前者会按照节点在 层级管理器 中显示顺序从上到下排列；后者会按照节点显示从下到上排列。
    其他布局模式还在持续添加中
  ◆UI组件
  ScrollView  一种带滚动功能的容器  「组合型控件」
    PS：提供在有限的显示区域内浏览更多内容的一种方式;
      通常 ScrollView 会与 Mask组件配合使用,
      同时也可以添加ScrollBar组件来显示浏览内容的位置;
      滚动视图的脚本接口请参考ScrollView API;
      ScrollView 组件必须有指定的 content 节点才能起作用,
      通过指定滚动方向和 content 节点在此方向上的长度来计算滚动时的位置信息,
      Content 节点也可以通过UIWidget设置自动 resize。
    一般节点组成：
      ScrollView 根节点
      content （内容）节点
        content 节点用来承载将会在滚动视图中显示的内容,
        这个节点的约束框通常会远远大于 ScrollView 根节点的约束框,
        也只有在 content 节点比 ScrollView 节点大时,视图才能有效的滚动。
        content 节点可以包括任意数量的子节点,配合 Layout 组件,
        可以确保 content 节点的约束框等于所有子节点约束框的总和。
      Mask（遮罩）节点
        可选,通常都希望能够隐藏 content 中超出 ScrollView 约束框范围的内容。
        Mask 组件能够隐藏自身约束框范围外的子节点内容,注意 Mask 属于渲染组件,
        因此不能和其他渲染组件（如 Sprite,Label 等）共存于同一个节点上,
        我们需要额外的一个节点专门用来放置 Mask,
        否则 ScrollView 将无法设置用于背景的 Sprite 组件。
      ScrollBar（滚动条）节点
        滚动条也是可选的,在有鼠标的设备上,我们可以通过滚动条提供鼠标拖拽快速滚动的功能。
        而在移动设备上,滚动条通常只用于指示内容的总量和当前显示范围。
        我们可以同时设置横向和纵向两个滚动条,每个滚动条节点都包含一个 ScrollBar 组件。
        滚动条节点也可以包括子节点,来同时显示滚动条的前景和背景。
        另外值得注意的是,ScrollBar 的 handle 部分的尺寸是可变的,
        推荐使用 Sliced （九宫格）模式的 Sprite 作为 ScrollBar 的 handle。
    content    节点引用,用来创建 ScrollView 的可滚动内容 
      通常这可能是一个包含一张巨大图片的节点
    Horizontal 开启横向滚动
    Vertical   开启纵向滚动
    Inertia    开启滚动惯性
    Brake      滚动减速系数,范围 0-1 
      1   则立马停止滚动
      0   则会一直滚动到 content 的边界
    Elastic    开启滚动回弹
    Bounce Duration      回弹持续时间,范围 0-10,0 表示立即反弹
    Horizontal ScrollBar 节点引用,水平滚动条,显示content在水平方向上的位置 
    Vertical ScrollBar   节点引用,垂直滚动条,显示 content 在垂直方向上的位置
    Scroll Events        列表类型,默认为空 
      用户添加的每一个事件由节点引用,组件名称和一个响应函数组成
      详情见 'Scrollview 事件' 章节
    Cancel InnerEvents   滚动不触发子节点上的触摸事件
    ScrollView 事件 
      Target    带有脚本组件的节点。
      Component 脚本组件名称。
      Handle    指定一个回调函数,当 ScrollView 的事件发生的时候会调用此函数
      CustomEventData 用户指定任意的字符串作为事件回调的最后一个参数传入。
      Scrollview事件回调有两个参数
        第一个参数是 ScrollView 本身,第二个参数是 ScrollView 的事件类型。
    通常一个 ScrollView 的节点树：
      ScrollView
        view        // 可见区域
          content   // 显示内容,一般比显示区域大
            item    
            item
            ...
        ScrollBar
          bar
    通过脚本代码添加回调 
      方法一 添加的事件回调和使用编辑器添加的事件回调是一样的,通过代码添加, 
        需要首先构造一个 cc.Component.EventHandler 对象,
        然后设置好对应的 target, component, handler 和 customEventData 参数。
        //here is your component file, file name = MyComponent.js 
        cc.Class({
          extends: cc.Component,
          properties: {},
          
          onLoad: function () {
            var scrollViewEventHandler = new cc.Component.EventHandler();
            scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            scrollViewEventHandler.component = "MyComponent";//这个是代码文件名
            scrollViewEventHandler.handler = "callback";
            scrollViewEventHandler.customEventData = "foobar";
            
            var scrollview = node.getComponent(cc.ScrollView);
            scrollview.scrollEvents.push(scrollViewEventHandler);
          },
          
          //注意参数的顺序和类型是固定的
          callback: function (scrollview, eventType, customEventData) {
            //这里 scrollview 是一个 Scrollview 组件对象实例
            //这里的 eventType === cc.ScrollView.EventType enum 里面的值
            //这里的 customEventData 参数就等于你之前设置的 "foobar"
          }
        });
      方法二 通过 scrollview.node.on('scroll-to-top', ...) 的方式来添加
        //假设我们在一个组件的 onLoad 方法里面添加事件处理回调,在 callback 函数中进行事件处理:
        cc.Class({
          extends: cc.Component,
          
          
          properties: {
            scrollview: cc.ScrollView
          },
          
          onLoad: function () {
            this.scrollview.node.on('scroll-to-top', this.callback, this);
          },
          
          callback: function (event) {
            //这里的 event 是一个 EventCustom 对象,你可以通过 event.detail 获取 ScrollView 组件
            var scrollview = event.detail;
            //do whatever you want with scrollview
            //另外,注意这种方式注册的事件,也无法传递 customEventData
          }
        });
        同样的,你也可以注册 'scrolling', 'touch-up' , 'scrolling' 等事件,
        这些事件的回调函数的参数与 'scroll-to-top' 的参数一致。
  ScrollBar   滚动条组件,通过拖动滑块滚动节点  
    PS：与Slider组件类似,但是它主要是用于滚动而 Slider 则用来设置数值。
    Handle    滑动块
      长度/宽度会根据 ScrollView 的 content 的大小和实际显示区域的大小来计算
    Direction 滚动方向
    Enable Auto Hide 开启自动隐藏
      若开启了,那么在 ScrollBar 显示后的Auto Hide Time时间内会自动消失。
    Auto Hide Time   自动隐藏时间,需配合设置Enable Auto Hide
  Mask 遮罩
  Button 按钮
    PS：由带有 Button 组件的父节点和一个带有 Label 组件的子节点组成;
      Button 父节点提供交互功能和按钮背景图显示,Label 子节点提供按钮上文字渲染;
    Target      按钮「用来显示背景」
    Transition  用于设置当按钮按下时的状态变化
      None   无,按钮不会响应交互事件来改变自身外观
        但可以在按钮上加入自定义的脚本来精确控制交互的表现行为
      Color  颜色变化,为四种状态分别设置颜色叠加
        在按钮转换到对应状态时,设置的状态颜色会和按钮背景图的颜色进行相乘作为展示的颜色;
        通过 Duration 属性设置颜色变化过程的时间长度,实现颜色渐变的效果;
      Sprite 图片变化,为四种状态分别指定一个 SpriteFrame 图片资源
        当对应的状态被激活后,按钮背景图就会被替换为对应的图片资源;
        设置 Normal 状态的图片会覆盖按钮背景的 Sprite 属性中的 SpriteFrame;
      scale  尺寸变化,点击是尺寸缩放到一个比例后再恢复
      ◆子选项
      Normal,普通状态
      Pressed,按下时
      Hover,悬停状态
      Disabled,禁用状态
      Duration,过渡时间
      Zoom_Scale,缩放比例「可为负」
    Click_Events 点击事件 
      PS：Button 上的点击事件是为了方便设计师在制作UI界面时可以自行指定按钮功能而设置的,
        要让按钮按照自定义的方式响应更多样化的事件,可以参考 系统内置事件文档,
        手动在按钮节点上监听这些交互事件并做出处理。
        一个数组类型,将它的容量改成多个就可为点击事件添加对应多个响应回调方法;
      依次指定响应回调方法所在组件的节点->节点上的脚本组件->脚本中的方法到数组元素上,
      则该方法即为响应的回调方法;
  ProgressBar 进度条
    进度条是由 ProgressBar 组件驱动一个 Sprite 节点的属性来实现根据设置的数值显示不同长度或角度的进度。ProgressBar 有三种基本工作模式（由 Mode 属性设置）：
    
    HORIZONTAL 水平进度条
    VERTICAL 垂直进度条
    FILLED 填充进度条
    其他的基本属性设置请查阅ProgressBar 组件参考。
    
    水平和垂直模式（HORIZONTAL & VERTICAL）
    
    模式选择 HORIZONTAL 或 VERTICAL 时,进度条通过修改 Bar Sprite 引用节点的尺寸（width 或 height 属性）,来改变进度条显示的长度。在这两种模式下 Bar Sprite 推荐使用 Sliced 九宫格显示模式,这样在节点尺寸产生拉伸的情况下仍能保持高质量的图像渲染结果。
    
    在这两种模式下,Total Length 属性的单位是像素,用来指定进度条在 100% 的状态下（Progress 属性值为 1）Bar Sprite 的长度。这个属性保证我们在编辑场景时可以自由设置 Progress 为小于 1 的值,而 Bar Sprite 总是能够记录我们希望的总长度。
    
    填充模式（FILLED）
    
    和上面两种模式不同,填充模式下的进度条会通过按照一定百分比剪裁 Bar Sprite 引用节点来显示不同进度,因此我们需要对 Bar Sprite 引用的 Sprite 组件进行特定的设置。首先将该 Sprite 的 Type 属性设置为 FILLED,然后可以选择一个填充方向（HORIZONTAL、VERTICAL、RADIAL）,详情请查阅 Sprite 填充模式参考文档。
    
    要注意进度条在选择了填充模式后,Total Length 的单位变成了百分比小数,取值范围从 0 ~ 1,设置的 Total Length 数值会同步到 Bar Sprite 的 Fill Range 属性,使之保持一致。下图显示了填充模式进度条当 Bar Sprite 的 Fill Type 设置为 RADIAL 时,不同的 Total Length 对显示的影响。
  EditBox 输入框
  Canvas 组件 
    Design Resolution 设计分辨率
    Fit Height    适配高度「一般当实际宽高比大于设计宽高比时使用」
    Fit Width     适配宽度「一般当实际宽高比小于设计宽高比时使用」
    同时开启,无裁剪模式「有黑边」,优先按设备中能出现全部场景的方式选择其中一种适配方式;
    同时不开启,无黑边模式「出现裁剪的情况」,则优先使用无黑边的一种适配方式;
  ◆其他组件
  脚本组件
    脚本组件属性是组件脚本中声明的公开并可被序列化存储在场景和动画数据中的变量。
    通过属性检查器我们可以快捷的修改属性设置,达到不需要编程就可以调整游戏数据和玩法的目的。
    通常可以根据变量使用内存位置不同将属性分为值类型和引用类型两大类。
    值类型属性:包括数字、字符串、枚举等简单的占用很少内存的变量类型：
    数值（Number）：可以直接使用键盘输入,也可以按输入框旁边的上下箭头逐步增减属性值。
    向量（Vec2）：向量的控件是两个数值输入组合在一起,并且输入框上会以x,y标识每个数值对应的子属性名。
    字符串（String）：直接在文本框里用键盘输入字符串,字符串输入控件分为单行和多行两种,多行文本框可以按回车换行。
    布尔（Boolean）：以复选框的形式来编辑,选中状态表示属性值为true,非选中状态表示false。
    枚举（Enum）：以下拉菜单的形式编辑,点击枚举菜单,然后从弹出的菜单列表里选择一项,即可完成枚举值的修改。
    颜色（Color）：点击颜色属性预览框,会弹出颜色选择器窗口,在这个窗口里可以用鼠标直接点选需要的颜色,或在下面的 RGBA 颜色输入框中直接输入指定的颜色。点击颜色选择器窗口以外的任何位置会关闭窗口并以最后选定的颜色作为属性颜色。
    引用类型属性
    引用类型包括更复杂的对象,比如节点、组件或资源。
    和值类型各式各样的编辑方式不同,
    引用类型通常只有一种编辑方式：拖拽节点或资源到属性栏中。
    引用类型的属性在初始化后会显示None,因为无法通过脚本为引用类型的属性设置初始值。
    这时可以根据属性的类型将相应类型的节点或资源拖拽上去,即可完成引用赋值。
    需要拖拽节点来赋值的属性栏上会显示绿色的标签,
    标签上可能会显示Node, 表示任意节点都可以拖拽上去,
    或者标签显示组件名如Sprite,Animation等,这时需要拖拽挂载了相应组件的节点才行。
    需要拖拽资源赋值的属性栏上会显示黄色的标签,
    标签上显示的是资源的类型,如sprite-frame,prefab,font等。
    只要从资源管理器中拖拽相应类型的资源过来就可以完成赋值。
    脚本文件也是一种资源,组件使用的脚本资源引用属性也是用黄色标签表示的。
Console,控制台 
  PS：控制台会显示报错、警告或其他编辑器和引擎生成的日志信息。
    不同重要级别的信息会以不同颜色显示：
    Log,日志： 灰色文字,通常用来显示正在进行的操作。
    Info,提示：蓝色文字,用来显示重要提示信息。
    Success,成功：绿色文字,表示当前执行的操作已成功完成。
    Warn,警告：   黄色文字,用来提示用户最好进行处理的异常情况,但不处理也不会影响运行。
    Error,报错：  红色文字,表示出现了严重错误,必须解决才能进行下一步操作或运行游戏。
  clear,清除  清除控制台面板中的所有当前信息。
  filter,过滤输入  根据输入的文本过滤控制台中的信息
    若勾选了旁边的Regex,输入的文本会被当做正则表达式来匹配文本。
  collapse,合并同类信息  该选项处于激活状态时,相同而重复的信息会被合并成一条,
    在信息旁边会以黄色数字提示有多少条同类信息被合并了。    
动画编辑器 
--------------------------------------------------------------------------------
UI系统 
  ◆渲染节点
  Sprite         精灵图,场景图像
  Sprite         单色
  Label          文字节点
  RichText       富文本
  ParticleSystem 粒子
  TiledMap       地图
  ◆UI节点 
  Layout      自动布局
  Buttom      按钮
  Canvas      画布
  ScrollView  滚动视图
  Slider      滑动器
  PageView    页面视图
  ProgressBar 进度条
  Toggle      复选按钮
  ToggleGroup 单选按钮
  EditBox     输入框
  VideoPlayer 播放器
  WebView     网页视图
  
  ScrollView 滚动视图
  Prefab 复用列表内容
  
  e.g.： 制作动态生成内容的列表
    准备数据
      以物品栏为例,我们要动态生成一个物品,大概需要这样的一组数据：
      物品 id
      图标 id,我们可以在另一张资源表中建立图标 id 到对应 spriteFrame 的索引
      物品名称
      出售价格
      ...
    下面我们将会结合脚本介绍如何定义和使用数据,如果您对 Cocos Creator 的脚本系统还不熟悉,可以先从 脚本开发工作流程一章开始学习。
    
    自定义数据类
    
    对于大多数游戏来说,这些数据通常都来自于服务器或本地的数据库,现在我们为了展示流程,暂时把数据存在列表组件里就可以了。您可以新建一个脚本 ItemList.js,并添加如下的属性：
    
    var Item = cc.Class({
      name: 'Item',
      properties: {
        id: 0,
        itemName: '',
        itemPrice: 0,
        iconSF: cc.SpriteFrame
      }
    });
    
    cc.Class({
      extends: cc.Component,
      properties: {
        items: {
          default: [],
          type: Item
        }
      },
    });
    上面脚本的前半部分我们声明了一个叫做 Item 的数据类,用来存放我们展示物品需要的各种数据。注意这个类并没有继承 cc.Component,因此他不是一个组件,但可以被组件使用。关于声明自定义类的更多内容,请查阅自定义 Class文档。
    
    下半部分是正常的组件声明方式,这个组件中只有一个 items 属性,上面的声明方式将会给我们一个由 Item 类组成的数组,我们可以在 属性检查器 中为每个 Item 元素设置数据。
    
    新建一个节点并将 ItemList.js 添加上去,我们可以在 属性检查器 里找到 Items 属性,要开始创建数据,需要先将数组的容量设为大于 0 的值。让我们将容量设为 3,并将每个元素的数据如下图设置。
    
    item list
    
    这样我们最基本的数据就准备好了,如果您在制作有很多内容的游戏,请务必使用 excel、数据库等更专业的系统来管理您的数据,将外部数据格式转化为 Cocos Creator 可以使用的 JavaScript 和 JSON 格式都非常容易。
    
    制作表现：Prefab 模板
    
    接下来我们还需要一个可以在运行时用来实例化每个物品的模板资源 —— Prefab 预制。这个 Prefab 的结构如下图所示
    
    item template
    
    icon, name, price 节点之后就会用来展示图标、物品名称和价格的数据。
    
    模板组件绑定
    
    您在拼装 Prefab 时可以根据自己的需要自由发挥,上图中展示的仅仅是一个结构的例子。有了物品的模板结构,接下来我们需要一个组件脚本来完成节点结构的绑定。新建一个 ItemTemplate.js 的脚本,并将其添加到刚才制作的模板节点上。该脚本内容如下：
    
    cc.Class({
      extends: cc.Component,
      properties: {
        id: 0,
        icon: cc.Sprite,
        itemName: cc.Label,
        itemPrice: cc.Label
      }
    });
    接下来将对应的节点拖拽到该组件的各个属性上：
    
    item binding
    
    注意 id 这个属性我们会直接通过数据赋值,不需要绑定节点。
    
    通过数据更新模板表现
    
    接下来我们需要继续修改 ItemTemplate.js,为其添加接受数据后进行处理的逻辑。在上述脚本后面加入以下内容：
    
    properties: {
      ...
    },
    // data: {id,iconSF,itemName,itemPrice}
    init: function (data) {
      this.id = data.id;
      this.icon.spriteFrame = data.iconSF;
      this.itemName.string = data.itemName;
      this.itemPrice.string = data.itemPrice;
    }
    init 方法接受一个数据对象,并使用这个对象里的数据更新各个负责表现组件的相应属性。现在我们可以将Item 节点保存成一个 Prefab 了,这就是我们物品的模板。
    
    根据数据生成列表内容
    
    现在让我们回到 ItemList.js 脚本,接下来要添加的是物品模板 Prefab 的引用,以及动态生成列表的逻辑。
    
    properties: {
      //...
      itemPrefab: cc.Prefab
    },
    
    onLoad () {
      for (var i = 0; i < this.items.length; ++i) {
        var item = cc.instantiate(this.itemPrefab);
        var data = this.items[i];
        this.node.addChild(item);
        item.getComponent('ItemTemplate').init({
          id: data.id,
          itemName: data.itemName,
          itemPrice: data.itemPrice,
          iconSF: data.iconSF
        });
      }
    }
    在 onLoad 回调方法里,我们依次遍历 items 里存储的每个数据,以 itemPrefab 为模板生成新节点并添加到 ItemList.js 所在节点上。之后调用 ItemTemplate.js 里的 init 方法,更新每个节点的表现。
    
    现在我们可以为 ItemList.js 所在的节点添加一个 Layout 组件,通过 属性检查器 下方的 添加组件/添加 UI 组件/Layout,然后设置 Layout 组件的以下属性：
    
    Type: HORIZONTAL
    Resize Mode: CONTAINER
    别忘了把 item Prefab 拖拽到 ItemList 组件的 itemPrefab 属性里。您还可以为这个节点添加一个 Sprite 组件,作为列表的背景。
    
    完成后的 itemList 节点属性如下：
    
    itemlist complete
    
    预览效果
    
    最后运行预览,可以看到类似这样的效果（具体效果和您制作的物品模板,以及输入的数据有关）：
    
    result
    
    注意前面步骤中添加 Layout 组件并不是必须的,Layout 能够帮助您自动排列列表中的节点元素,但您也可以用脚本程序来控制节点的排列。我们通常还会配合 ScrollView 滚动视图组件一起使用,以便在有限的空间内展示大量内容。可以配合自动布局和滚动视图一起学习。
    
    继续前往下一章 动画系统 说明文档。
动画系统 
  功能 
    具有标准的位移、旋转、缩放动画和序列帧动画,
    支持任意组件属性和用户自定义属性的驱动,
    可任意编辑时间曲线和创新的移动轨迹编辑功能,
    能不写一行代码就制作出复杂而细腻的各种动态效果。
  动画根节点
  Animation 组件
    PS：也是节点上的一个组件
    动画编辑器划分 
      1、main 常用按钮区域
        显示一些常用功能按钮,从左到右依次为：
        开关录制状态、返回第一帧、上一帧、播放/暂停、下一帧、新建动画剪辑、插入动画事件
      2、时间轴与事件 显示时间轴,添加的自定义事件也会在这里显示。
      3、层级管理「节点树」  当前动画剪辑可以影响到的节点数据。
      4、节点内动画帧的预览区域  是显示各个节点上的所有帧的预览时间轴。
      5、属性列表 显示当前选中的节点在选中的动画剪辑中已经包含了的属性列表。
      6、关键帧   每个属性相对应的帧都会显示在这里
      7、动画剪辑的基本属性 选择动画剪辑后,基本数据都在这里显示以及更改。
    Clip 动画剪辑
      就是一份动画的声明数据,将其挂载到 Animation 组件上,将动画数据应用到节点上
    节点数据的索引方式
      数据中索引节点的方式是以挂载 Animation 组件的节点为根节点的相对路径。 
      所以在同个父节点下的同名节点,只能够产生一份动画数据,并且只能应用到第一个同名节点上。
    clip文件的参数
      sample 定义当前动画数据每秒的帧率,默认为 60
        这个参数会影响时间轴上每两个整数秒刻度之间的帧数量「也就是两秒之内有多少格」。
      speed 当前动画的播放速度,默认为 1
      duration 当动画播放速度为 1 的时候,动画的持续时间
      real time 动画从开始播放到结束,真正持续的时间
      wrap mode 循环模式
    动画编辑模式 
      动画在普通模式下是不允许编辑的,只有在动画编辑模式下,才能够编辑动画文件。
      但是在编辑模式下,无法对节点进行 增加 / 删除 / 改名 操作。
      打开编辑模式：
      选中一个包含 Animation 组件,并且包含有一个以上 clip 文件的节点。
      然后在动画编辑器左上角点击唯一的按钮。
      退出编辑模式：
      点击动画编辑器上点击左上角的编辑按钮,或者在场景编辑器左上角的关闭按钮
    时间轴的刻度单位表示方式
      时间轴上刻度的表示法是 1:05。该数值由两部分组成,冒号前面的是表示当前秒数,
      冒号后面的表示在当前这一秒里的第几帧。
      1:05 表示该刻度在时间轴上位于从动画开始经过了 1 秒又 5 帧 的时间。
      因为动画帧率（sample）可以随时调整,因此同一个刻度表示的时间点也会随着帧率变化而有所不同。
      当帧率为 30 时,1:05 表示动画开始后 1 + 5/30 = 1.1667 秒。
      当帧率为 10 时,1:05 表示动画开始后 1 + 5/10 = 1.5 秒。
      虽然当前刻度表示的时间点会随着帧率变化,但一旦在一个位置添加了关键帧,该关键帧所在的总帧数是不会改变的, 假如我们在帧率 30 时向 1:05 刻度上添加了关键帧,该关键帧位于动画开始后总第 35 帧。之后把帧率修改为 10,该关键帧仍然处在动画开始后第 35 帧,而此时关键帧所在位置的刻度读数为 3:05。换算成时间以后正好是之前的 3 倍。
    相关操作
      移动显示区域  空格 + 左键 左右拖动「适用于 2、4、6 区域」
    快捷键
      left：向前移动一帧,如果已经在第 0 帧,则忽略当前操作
      right：向后移动一帧
      up：跳转到上一个关键帧
      down：跳转到下一个关键帧
      delete：删除当前所选中的关键帧
      k：正向的播放动画,抬起后停止
      j：反向播放动画,抬起后停止
      ctrl + left：跳转到第 0 帧
      ctrl + right：跳转到有效的最后一帧
  创建Animation组件和动画剪辑 
    创建 Animation 组件 
      若想在一节点上创建动画,必须为它新建一个 Animation 组件
    创建与挂载动画剪辑
      资源管理器中创建 Animation Clip,默认名为 'New AnimationClip' 的剪辑文件。 
      选中节点,在属性检查器将 Animation 组件的 Clips 改成 1;
      将创建的节点拖入 clip 选择框 内。
    编辑动画曲线 
      动画属性包括了节点自有的position,rotation等属性,
      也包含了组件Component中自定义的属性。 
      组件包含的属性前会加上组件的名字,比如cc.Sprite.spriteFrame。
    添加一个新的属性轨道
      选中节点,然后在属性区域点击 add property,选择想要添加的属性
      也可以在编辑模式下直接更改节点的对应轨道的属性
        如直接在场景编辑器中拖动当前选中的节点,
        position 轨道上就会在当前的时间上增加一个关键帧。
    添加动画帧
      刚刚我们说到在录制状态下直接更改对应属性可以自动添加对应的属性和帧。 也可以直接在属性列表中点击对应属性右侧的+号,这样会在当前选中的时间点上增加一帧。
    选择动画帧
      点击我们创建的序列帧后序列帧会显示成选中状态,此时序列帧由蓝变白,如果需要多选,可以按住ctrl再次选择其他序列帧。或者直接在属性区域拖拽框选。
    移动动画帧
      此时我们将鼠标移动到任意一个选中的节点上,鼠标会显示出左右箭头,这时候按下鼠标左键就可以拖拽所有被选中的节点了。
    更改动画帧
      点击需要修改的动画帧,此时时间轴上选中的帧也会跳到这一帧,然后确保打开了录制状态,直接在属性检查器内修改对应的属性即可。
    删除动画帧
      
      选中序列帧后,点击属性区域的-,此时当前属性被选中的序列帧会被删除。或者直接按下键盘上的 delete 按键,则所有被选中的节点都会被删除。
      
      继续前往 编辑序列帧动画。      
  编辑序列帧动画
    我们刚刚了解了属性帧的操作,现在来看看具体怎么创建一个帧动画。

    为节点新增Sprite组件

    首先我们需要让节点正常显示纹理,所以需要为节点增加Sprite组件。 选中节点后在属性检查器中通过 添加组件 按钮,选择 添加渲染组件->Sprite。

    在属性列表中添加 cc.Sprite.spriteFrame

    节点可以正常显示纹理后,还需要为纹理创建一个动画轨道。 在动画编辑器中点击add property,然后选择cc.Sprite.spriteFrame

    添加帧

    从资源管理器中,将纹理拖拽到属性帧区域,放在 cc.Sprite.spriteFrame 轨道上。 再将下一帧需要显示的纹理拖到指定位置,然后点击播放就可以预览刚刚创建的动画了。
  编辑时间曲线 
    我们已经创建了基本的动画了。 但有时候我们会需要在两帧之间实现EaseInOut等缓动效果,那么在动画编辑器中怎么实现呢？
    
    我们首先需要在一条轨道上创建两个不相等的帧,比如在position上创建两帧,从 0,0 到 100,100,这时候两帧之间会出现一根连接线,双击连接线,则可以打开时间曲线编辑器。
    
    main
    
    使用预设曲线
    
    我们在曲线编辑器左侧可以选择预设的各种效果。比如说 Ease In 等。 选中后右侧上方还会出现一些预设的参数,可以根据需求选择。
    
    自定义曲线
    
    有时候预设的不能够满足动画需求,我们也可以自己修改曲线。 右侧下方预览图内,有两个灰色的控制点,拖拽控制点可以更改曲线的轨迹。 如果控制点需要拖出视野外,则可以使用鼠标滚轮或者右上角的小比例尺缩放预览图,支持的比例从 0.1 到 1。
  添加动画事件
    在游戏中,经常需要在动画结束或者某一帧的特定时刻,执行一些函数方法。那么在动画编辑器中怎么实现呢？
    
    添加事件
    
    首先选中某个位置,然后点击按钮区域最左侧的按钮（add event）,这时候在时间轴上会出现一个白色的矩形,这就是我们添加的事件。
    
    button
    
    删除事件
    
    双击刚刚出现的白色矩形,打开事件编辑器后点击 function 后面的回收图标,会提示是否删除这个 event,点击确认则删除。
    
    delete
    
    也可以在动画编辑器中右键点击 event,选择delete。
    
    指定事件触发函数以及传入参数
    
    双击刚刚出现的白色矩形,可以打开事件编辑器,在编辑器内,我们可以手动输入需要出发的function名字,触发的时候会根据这个函数名,去各个组件内匹配相应的方法。
    
    如果需要添加传入的参数,则在 Params 旁点击 + 或者 - ,只支持Boolean,String,Number三种类型的参数。
  使用脚本控制动画
    Animation 组件
    
    Animation 组件提供了一些常用的动画控制函数,如果只是需要简单的控制动画,可以通过获取节点的 Animation 组件来做一些操作。
    
    播放
    
    var anim = this.getComponent(cc.Animation);
    
    // 如果没有指定播放哪个动画,并且有设置 defaultClip 的话,则会播放 defaultClip 动画
    anim.play();
    
    // 指定播放 test 动画
    anim.play('test');
    
    // 指定从 1s 开始播放 test 动画
    anim.play('test', 1);
    
    // 使用 play 接口播放一个动画时,如果还有其他的动画正在播放,则会先停止其他动画
    anim.play('test2');
    Animation 对一个动画进行播放的时候会判断这个动画之前的播放状态来进行下一步操作。 如果动画处于：
    
    停止 状态,则 Animation 会直接重新播放这个动画
    暂停 状态,则 Animation 会恢复动画的播放,并从当前时间继续播放下去
    播放 状态,则 Animation 会先停止这个动画,再重新播放动画
    var anim = this.getComponent(cc.Animation);
    
    // 播放第一个动画
    anim.playAdditive('position-anim');
    
    // 播放第二个动画
    // 使用 playAdditive 播放动画时,不会停止其他动画的播放。如果还有其他动画正在播放,则同时会有多个动画进行播放
    anim.playAdditive('rotation-anim');
    Animation 是支持同时播放多个动画的,播放不同的动画并不会影响其他的动画的播放状态,这对于做一些复合动画比较有帮助。
    
    暂停 恢复 停止
    
    var anim = this.getComponent(cc.Animation);
    
    anim.play('test');
    
    // 指定暂停 test 动画
    anim.pause('test');
    
    // 暂停所有动画
    // anim.pause();
    
    // 指定恢复 test 动画
    anim.resume('test');
    
    // 恢复所有动画
    // anim.resume();
    
    // 指定停止 test 动画
    anim.stop('test');
    
    // 停止所有动画
    // anim.stop();
    暂停,恢复, 停止 几个函数的调用比较接近。
    
    暂停 会暂时停止动画的播放,当 恢复 动画的时候,动画会继续从当前时间往下播放。 而 停止 则会终止动画的播放,再对这个动画进行播放的时候会重新从开始播放动画。
    
    设置动画的当前时间
    
    var anim = this.getComponent(cc.Animation);
    
    anim.play('test');
    
    // 设置 test 动画的当前播放时间为 1s
    anim.setCurrentTime(1, 'test');
    
    // 设置所有动画的当前播放时间为 1s
    // anim.setCurrentTime(1);
    你可以在任何时候对动画设置当前时间,但是动画不会立刻根据设置的时间进行状态的更改,需要在下一个动画的 update 中才会根据这个时间重新计算播放状态。
    
    AnimationState
    
    Animation 只提供了一些简单的控制函数,希望得到更多的动画信息和控制的话,需要使用到 AnimationState。
    
    AnimationState 是什么？
    
    如果说 AnimationClip 作为动画数据的承载,那么 AnimationState 则是 AnimationClip 在运行时的实例,它将动画数据解析为方便程序中做计算的数值。 Animation 在播放一个 AnimationClip 的时候,会将 AnimationClip 解析成 AnimationState。 Animation 的播放状态实际都是由 AnimationState 来计算的,包括动画是否循环,怎么循环,播放速度 等。
    
    获取 AnimationState
    
    var anim = this.getComponent(cc.Animation);
    // play 会返回关联的 AnimationState
    var animState = anim.play('test');
    
    // 或是直接获取
    var animState = anim.getAnimationState('test');
    获取动画信息
    
    var anim = this.getComponent(cc.Animation);
    var animState = anim.play('test');
    
    // 获取动画关联的clip
    var clip = animState.clip;
    
    // 获取动画的名字
    var name = animState.name;
    
    // 获取动画的播放速度
    var speed = animState.speed;
    
    // 获取动画的播放总时长
    var duration = animState.duration;
    
    // 获取动画的播放时间
    var time = animState.time;
    
    // 获取动画的重复次数
    var repeatCount = animState.repeatCount;
    
    // 获取动画的循环模式
    var wrapMode = animState.wrapMode
    
    // 获取动画是否正在播放
    var playing = animState.isPlaying;
    
    // 获取动画是否已经暂停
    var paused = animState.isPaused;
    
    // 获取动画的帧率
    var frameRate = animState.frameRate;
    从 AnimationState 中可以获取到所有动画的信息,你可以利用这些信息来判断需要做哪些事情。
    
    设置动画播放速度
    
    var anim = this.getComponent(cc.Animation);
    var animState = anim.play('test');
    
    // 使动画播放速度加速
    animState.speed = 2;
    
    // 使动画播放速度减速
    animState.speed = 0.5;
    speed 值越大速度越快,值越小则速度越慢
    
    设置动画 循环模式 与 循环次数
    
    var anim = this.getComponent(cc.Animation);
    var animState = anim.play('test');
    
    // 设置循环模式为 Normal
    animState.wrapMode = cc.WrapMode.Normal;
    
    // 设置循环模式为 Loop
    animState.wrapMode = cc.WrapMode.Loop;
    
    // 设置动画循环次数为2次
    animState.repeatCount = 2;
    
    // 设置动画循环次数为无限次
    animState.repeatCount = Infinity;
    AnimationState 允许动态设置循环模式,目前提供了多种循环模式,这些循环模式可以从 cc.WrapMode 中获取到。 如果动画的循环类型为 Loop 类型的话,需要与 repeatCount 配合使用才能达到效果。 默认在解析动画剪辑的时候,如果动画循环类型为：
    
    Loop 类型,repeatCount 将被设置为 Infinity, 即无限循环
    Normal 类型,repeatCount 将被设置为 1
    动画事件
    
    在动画编辑器里支持可视化编辑帧事件 (如何编辑请参考 这里 ),在脚本里书写动画事件的回调也非常简单。 动画事件的回调其实就是一个普通的函数,在动画编辑器里添加的帧事件会映射到动画根节点的组件上。
    
    实例：
    
    假设在动画的结尾添加了一个帧事件,如下图： animation event
    
    那么在脚本中可以这么写：
    
    cc.Class({
        extends: cc.Component,
    
        onAnimCompleted: function (num, string) {
            console.log('onAnimCompleted: param1[%s], param2[%s]', num, string);
        }
    });
    将上面的组件加到动画的 根节点 上,当动画播放到结尾时,动画系统会自动调用脚本中的 onAnimCompleted 函数。 动画系统会搜索动画根节点中的所有组件,如果组件中有实现动画事件中指定的函数的话,就会对它进行调用,并传入事件中填的参数。
    
    注册动画回调
    
    除了动画编辑器中的帧事件提供了回调外,动画系统还提供了动态注册回调事件的方式。
    目前支持的回调事件有：
    
    play : 开始播放时
    stop : 停止播放时
    pause : 暂停播放时
    resume : 恢复播放时
    lastframe : 假如动画循环次数大于 1,当动画播放到最后一帧时
    finished : 动画播放完成时
    当在 cc.Animation 注册了一个回调函数后,它会在播放一个动画时,对相应的 cc.AnimationState 注册这个回调,在 cc.AnimationState 停止播放时,对 cc.AnimationState 取消注册这个回调。
    
    cc.AnimationState 其实才是动画回调的发送方,如果希望对单个 cc.AnimationState 注册回调的话,那么可以获取到这个 cc.AnimationState 再单独对它进行注册。
    
    实例
    
    var animation = this.node.getComponent(cc.Animation);
    
    // 注册
    animation.on('play',      this.onPlay,        this);
    animation.on('stop',      this.onStop,        this);
    animation.on('lastframe', this.onLastFrame,   this);
    animation.on('finished',  this.onFinished,    this);
    animation.on('pause',     this.onPause,       this);
    animation.on('resume',    this.onResume,      this);
    
    // 取消注册
    animation.off('play',      this.onPlay,        this);
    animation.off('stop',      this.onStop,        this);
    animation.off('lastframe', this.onLastFrame,   this);
    animation.off('finished',  this.onFinished,    this);
    animation.off('pause',     this.onPause,       this);
    animation.off('resume',    this.onResume,      this);
    
    // 对单个 cc.AnimationState 注册回调
    var anim1 = animation.getAnimationState('anim1');
    anim1.on('lastframe',    this.onLastFrame,      this);
    动态创建 Animation Clip
    
        var animation = this.node.getComponent(cc.Animation);
        // frames 这是一个 SpriteFrame 的数组.
        var clip = cc.AnimationClip.createWithSpriteFrames(frames, 17);
        clip.name = "anim_run";
        clip.wrapMode = cc.WrapMode.Loop;
    
        // 添加帧事件
        clip.events.push({
            frame: 1,               // 准确的时间,以秒为单位。这里表示将在动画播放到 1s 时触发事件
            func: "frameEvent",     // 回调函数名称
            params: [1, "hello"]    // 回调参数
        });
    
        animation.addClip(clip);
        animation.play('anim_run');    
碰撞系统 
  本章将介绍 Cocos Creator 的碰撞系统,目前 Cocos Creator 内置了一个简单易用的碰撞检测系统,支持 圆形,矩形 以及 多边形 相互间的碰撞检测。
  下面会分成几个小节来介绍碰撞系统的细节内容。
  
  编辑碰撞组件
  碰撞分组管理
  碰撞系统脚本控制
--------------------------------------------------------------------------------
构建打包发布
--------------------------------------------------------------------------------














