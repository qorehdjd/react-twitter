(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{7697:function(n,e,t){"use strict";var r=t(2640),i=t(7294),o=t(4538),c=t(9673),a=t(1889),s=t(9473),u=t(2167),l=t(4324),d=t(5893);e.Z=function(){var n=(0,s.v9)(function(n){return n.post}),e=n.imagePaths,t=n.addPostDone,f=(0,s.I0)(),p=(0,l.Z)(""),m=(0,r.Z)(p,3),h=m[0],x=m[1],v=m[2];(0,i.useEffect)(function(){t&&v("")},[t]);var g=(0,i.useCallback)(function(){if(!h||!h.trim())return alert("게시글을 작성하세요.");var n=new FormData;e.forEach(function(e){n.append("image",e)}),n.append("content",h),f({type:u.z9,data:n})},[h,e]),j=(0,i.useRef)(),y=(0,i.useCallback)(function(){j.current.click()},[j.current]),w=(0,i.useCallback)(function(n){var e=new FormData;[].forEach.call(n.target.files,function(n){e.append("image",n)}),f({type:u.QA,data:e})},[]),k=(0,i.useCallback)(function(n){return function(){f({type:u.Po,data:{imagePath:n}})}},[]);return(0,d.jsxs)(o.Z,{style:{margin:"10px 0 20px"},encType:"multipart/form-data",onFinish:g,children:[(0,d.jsx)(c.Z.TextArea,{value:h,onChange:x,maxLength:140,placeholder:"어떤 신기한 일이 있었나요?"}),(0,d.jsxs)("div",{children:[(0,d.jsx)("input",{type:"file",name:"image",multiple:!0,hidden:!0,ref:j,onChange:w}),(0,d.jsx)(a.Z,{onClick:y,children:"이미지 업로드"}),(0,d.jsx)(a.Z,{type:"primary",style:{float:"right"},htmlType:"submit",children:"쨱짹"})]}),(0,d.jsx)("div",{children:null==e?void 0:e.map(function(n){return(0,d.jsxs)("div",{style:{display:"inline-block"},children:[(0,d.jsx)("img",{src:n.replace(/\/thumb\//,"/original/"),style:{width:"200px"},alt:n}),(0,d.jsx)("div",{children:(0,d.jsx)(a.Z,{onClick:k(n),children:"제거"})})]},n)})})]})}},3574:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSP:function(){return p}});var r=t(7294),i=t(9473),o=t(1163),c=t(9008),a=t.n(c),s=t(5616),u=t(7187),l=t(7697),d=t(2167),f=t(5893),p=!0;e.default=function(){var n=(0,o.useRouter)().query.id,e=(0,i.I0)(),t=(0,r.useRef)(!1),c=(0,i.v9)(function(n){return n.user}).me,p=(0,i.v9)(function(n){return n.post}),m=p.userPosts,h=p.hasMorePost,x=p.loadUserPostsLoading,v=p.retweetError,g=(0,i.v9)(function(n){return n.user}).userInfo;return(0,r.useEffect)(function(){t.current?v&&alert(v):t.current=!0},[v]),(0,r.useEffect)(function(){function t(){if(!h)return window.removeEventListener("scroll",t);if(!x&&window.scrollY+document.documentElement.clientHeight+500>document.documentElement.scrollHeight){var r,i=null===(r=m[m.length-1])||void 0===r?void 0:r.id;e({type:d.x5,data:{userId:n,lastId:i}})}}return window.addEventListener("scroll",t),function(){return window.removeEventListener("scroll",t)}},[h,x,m,n]),(0,f.jsxs)(s.Z,{children:[g&&(0,f.jsxs)(a(),{children:[(0,f.jsxs)("title",{children:[g.nickname,"님의 글"]}),(0,f.jsx)("meta",{name:"description",content:"".concat(g.nickname,"님의 게시글")}),(0,f.jsx)("meta",{property:"og:title",content:"".concat(g.nickname,"님의 게시글")}),(0,f.jsx)("meta",{property:"og:description",content:"".concat(g.nickname,"님의 게시글")}),(0,f.jsx)("meta",{property:"og:image",content:"https://nodebird.com/favicon.ico"}),(0,f.jsx)("meta",{property:"og:url",content:"https://nodebird.com/user/".concat(n)})]}),c&&(0,f.jsx)(l.Z,{}),m.map(function(n){return(0,f.jsx)(u.Z,{post:n},n.id)})]})}},217:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/[id]",function(){return t(3574)}])}},function(n){n.O(0,[885,661,337,775,538,774,888,179],function(){return n(n.s=217)}),_N_E=n.O()}]);