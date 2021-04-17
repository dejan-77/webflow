
//CUSTOM EASE cijela skripta - trenutno radi samo ovdje
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function m(e){return Math.round(1e5*e)/1e5||0}var b=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,w=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,Y=Math.PI/180,k=Math.sin,B=Math.cos,F=Math.abs,J=Math.sqrt;function arcToSegment(e,t,n,s,a,r,i,o,h){if(e!==o||t!==h){n=F(n),s=F(s);var u=a%360*Y,f=B(u),c=k(u),l=Math.PI,g=2*l,x=(e-o)/2,d=(t-h)/2,m=f*x+c*d,p=-c*x+f*d,y=m*m,M=p*p,v=y/(n*n)+M/(s*s);1<v&&(n=J(v)*n,s=J(v)*s);var C=n*n,E=s*s,b=(C*E-C*M-E*y)/(C*M+E*y);b<0&&(b=0);var w=(r===i?-1:1)*J(b),P=n*p/s*w,S=-s*m/n*w,N=f*P-c*S+(e+o)/2,D=c*P+f*S+(t+h)/2,T=(m-P)/n,V=(p-S)/s,_=(-m-P)/n,q=(-p-S)/s,A=T*T+V*V,R=(V<0?-1:1)*Math.acos(T/J(A)),G=(T*q-V*_<0?-1:1)*Math.acos((T*_+V*q)/J(A*(_*_+q*q)));isNaN(G)&&(G=l),!i&&0<G?G-=g:i&&G<0&&(G+=g),R%=g,G%=g;var L,O=Math.ceil(F(G)/(g/4)),j=[],z=G/O,I=4/3*k(z/2)/(1+B(z/2)),H=f*n,Q=c*n,Z=c*-s,U=f*s;for(L=0;L<O;L++)m=B(a=R+L*z),p=k(a),T=B(a+=z),V=k(a),j.push(m-I*p,p+I*m,T+I*V,V-I*T,T,V);for(L=0;L<j.length;L+=2)m=j[L],p=j[L+1],j[L]=m*H+p*Z+N,j[L+1]=m*Q+p*U+D;return j[L-2]=o,j[L-1]=h,j}}function stringToRawPath(e){function db(e,t,n,s){f=(n-e)/3,c=(s-t)/3,o.push(e+f,t+c,n-f,s-c,n,s)}var t,n,s,a,r,i,o,h,u,f,c,l,g,x,d,m=(e+"").replace(w,function(e){var t=+e;return t<1e-4&&-1e-4<t?0:t}).match(b)||[],p=[],y=0,M=0,v=m.length,C=0,E="ERROR: malformed path: "+e;if(!e||!isNaN(m[0])||isNaN(m[1]))return console.log(E),p;for(t=0;t<v;t++)if(g=r,isNaN(m[t])?i=(r=m[t].toUpperCase())!==m[t]:t--,s=+m[t+1],a=+m[t+2],i&&(s+=y,a+=M),t||(h=s,u=a),"M"===r)o&&(o.length<8?--p.length:C+=o.length),y=h=s,M=u=a,o=[s,a],p.push(o),t+=2,r="L";else if("C"===r)i||(y=M=0),(o=o||[0,0]).push(s,a,y+1*m[t+3],M+1*m[t+4],y+=1*m[t+5],M+=1*m[t+6]),t+=6;else if("S"===r)f=y,c=M,"C"!==g&&"S"!==g||(f+=y-o[o.length-4],c+=M-o[o.length-3]),i||(y=M=0),o.push(f,c,s,a,y+=1*m[t+3],M+=1*m[t+4]),t+=4;else if("Q"===r)f=y+2/3*(s-y),c=M+2/3*(a-M),i||(y=M=0),y+=1*m[t+3],M+=1*m[t+4],o.push(f,c,y+2/3*(s-y),M+2/3*(a-M),y,M),t+=4;else if("T"===r)f=y-o[o.length-4],c=M-o[o.length-3],o.push(y+f,M+c,s+2/3*(y+1.5*f-s),a+2/3*(M+1.5*c-a),y=s,M=a),t+=2;else if("H"===r)db(y,M,y=s,M),t+=1;else if("V"===r)db(y,M,y,M=s+(i?M-y:0)),t+=1;else if("L"===r||"Z"===r)"Z"===r&&(s=h,a=u,o.closed=!0),("L"===r||.5<F(y-s)||.5<F(M-a))&&(db(y,M,s,a),"L"===r&&(t+=2)),y=s,M=a;else if("A"===r){if(x=m[t+4],d=m[t+5],f=m[t+6],c=m[t+7],n=7,1<x.length&&(x.length<3?(c=f,f=d,n--):(c=d,f=x.substr(2),n-=2),d=x.charAt(1),x=x.charAt(0)),l=arcToSegment(y,M,+m[t+1],+m[t+2],+m[t+3],+x,+d,(i?y:0)+1*f,(i?M:0)+1*c),t+=n,l)for(n=0;n<l.length;n++)o.push(l[n]);y=o[o.length-2],M=o[o.length-1]}else console.log(E);return(t=o.length)<6?(p.pop(),t=0):o[0]===o[t-2]&&o[1]===o[t-1]&&(o.closed=!0),p.totalPoints=C+t,p}function p(){return M||"undefined"!=typeof window&&(M=window.gsap)&&M.registerPlugin&&M}function q(){(M=p())?(M.registerEase("_CE",n.create),a=1):console.warn("Please gsap.registerPlugin(CustomEase)")}function s(e){return~~(1e3*e+(e<0?-.5:.5))/1e3}function x(e,t,n,s,a,r,i,o,h,u,f){var c,l=(e+n)/2,g=(t+s)/2,d=(n+a)/2,m=(s+r)/2,p=(a+i)/2,y=(r+o)/2,M=(l+d)/2,v=(g+m)/2,C=(d+p)/2,E=(m+y)/2,b=(M+C)/2,w=(v+E)/2,P=i-e,S=o-t,N=Math.abs((n-i)*S-(s-o)*P),D=Math.abs((a-i)*S-(r-o)*P);return u||(u=[{x:e,y:t},{x:i,y:o}],f=1),u.splice(f||u.length-1,0,{x:b,y:w}),h*(P*P+S*S)<(N+D)*(N+D)&&(c=u.length,x(e,t,l,g,M,v,b,w,h,u,f),x(b,w,C,E,p,y,i,o,h,u,f+1+(u.length-c))),u}var M,a,t,y=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,v=/[cLlsSaAhHvVtTqQ]/g,n=((t=CustomEase.prototype).setData=function setData(e,t){t=t||{};var n,s,a,r,i,o,h,u,f,c=(e=e||"0,0,1,1").match(y),l=1,g=[],d=[],m=t.precision||1,p=m<=1;if(this.data=e,(v.test(e)||~e.indexOf("M")&&e.indexOf("C")<0)&&(c=stringToRawPath(e)[0]),4===(n=c.length))c.unshift(0,0),c.push(1,1),n=8;else if((n-2)%6)throw"Invalid CustomEase";for(0==+c[0]&&1==+c[n-2]||function _normalize(e,t,n){n||0===n||(n=Math.max(+e[e.length-1],+e[1]));var s,a=-1*e[0],r=-n,i=e.length,o=1/(+e[i-2]+a),h=-t||(Math.abs(e[i-1]-e[1])<.01*(e[i-2]-e[0])?function _findMinimum(e){var t,n=e.length,s=1e20;for(t=1;t<n;t+=6)+e[t]<s&&(s=+e[t]);return s}(e)+r:+e[i-1]+r);for(h=h?1/h:-o,s=0;s<i;s+=2)e[s]=(+e[s]+a)*o,e[s+1]=(+e[s+1]+r)*h}(c,t.height,t.originY),this.segment=c,r=2;r<n;r+=6)s={x:+c[r-2],y:+c[r-1]},a={x:+c[r+4],y:+c[r+5]},g.push(s,a),x(s.x,s.y,+c[r],+c[r+1],+c[r+2],+c[r+3],a.x,a.y,1/(2e5*m),g,g.length-1);for(n=g.length,r=0;r<n;r++)h=g[r],u=g[r-1]||h,(h.x>u.x||u.y!==h.y&&u.x===h.x||h===u)&&h.x<=1?(u.cx=h.x-u.x,u.cy=h.y-u.y,u.n=h,u.nx=h.x,p&&1<r&&2<Math.abs(u.cy/u.cx-g[r-2].cy/g[r-2].cx)&&(p=0),u.cx<l&&(u.cx?l=u.cx:(u.cx=.001,r===n-1&&(u.x-=.001,l=Math.min(l,.001),p=0)))):(g.splice(r--,1),n--);if(i=1/(n=1/l+1|0),h=g[o=0],p){for(r=0;r<n;r++)f=r*i,h.nx<f&&(h=g[++o]),s=h.y+(f-h.x)/h.cx*h.cy,d[r]={x:f,cx:i,y:s,cy:0,nx:9},r&&(d[r-1].cy=s-d[r-1].y);d[n-1].cy=g[g.length-1].y-s}else{for(r=0;r<n;r++)h.nx<r*i&&(h=g[++o]),d[r]=h;o<g.length-1&&(d[r-1]=g[g.length-2])}return this.ease=function(e){var t=d[e*n|0]||d[n-1];return t.nx<e&&(t=t.n),t.y+(e-t.x)/t.cx*t.cy},(this.ease.custom=this).id&&M.registerEase(this.id,this.ease),this},t.getSVGData=function getSVGData(e){return CustomEase.getSVGData(this,e)},CustomEase.create=function create(e,t,n){return new CustomEase(e,t,n).ease},CustomEase.register=function register(e){M=e,q()},CustomEase.get=function get(e){return M.parseEase(e)},CustomEase.getSVGData=function getSVGData(e,t){var n,a,r,i,o,h,u,f,c,l,g=(t=t||{}).width||100,x=t.height||100,d=t.x||0,p=(t.y||0)+x,y=M.utils.toArray(t.path)[0];if(t.invert&&(x=-x,p=0),"string"==typeof e&&(e=M.parseEase(e)),e.custom&&(e=e.custom),e instanceof CustomEase)n=function rawPathToString(e){!function _isNumber(e){return"number"==typeof e}(e[0])||(e=[e]);var t,n,s,a,r="",i=e.length;for(n=0;n<i;n++){for(a=e[n],r+="M"+m(a[0])+","+m(a[1])+" C",t=a.length,s=2;s<t;s++)r+=m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s++])+" "+m(a[s++])+","+m(a[s])+" ";a.closed&&(r+="z")}return r}(function transformRawPath(e,t,n,s,a,r,i){for(var o,h,u,f,c,l=e.length;-1<--l;)for(h=(o=e[l]).length,u=0;u<h;u+=2)f=o[u],c=o[u+1],o[u]=f*t+c*s+r,o[u+1]=f*n+c*a+i;return e._dirty=1,e}([e.segment],g,0,0,-x,d,p));else{for(n=[d,p],i=1/(u=Math.max(5,200*(t.precision||1))),f=5/(u+=2),c=s(d+i*g),a=((l=s(p+e(i)*-x))-p)/(c-d),r=2;r<u;r++)o=s(d+r*i*g),h=s(p+e(r*i)*-x),(Math.abs((h-l)/(o-c)-a)>f||r===u-1)&&(n.push(c,l),a=(h-l)/(o-c)),c=o,l=h;n="M"+n.join(",")}return y&&y.setAttribute("d",n),n},CustomEase);function CustomEase(e,t,n){a||q(),this.id=e,this.setData(t,n)}p()&&M.registerPlugin(n),n.version="3.6.1",e.CustomEase=n,e.default=n;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});

// --- REGISTER SCROLLTRIGGER


gsap.registerPlugin(ScrollTrigger);

// --- SMOOTH SCROLL -----------------------------------------

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
  getDirection: true,
   inertia: .6,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, 
  // we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  // UKLJUČITI SAMO NA MOBILNOJ VERZIJI
// pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();






/////////////////

gsap.set(".circle", {xPercent: -50, yPercent: -50});

let tl = gsap.timeline({
  scrollTrigger: {
  scroller: ".smooth-scroll",
    trigger: ".block--1",
    start: "top top",
    end: "+=100%",
    scrub: 0.5,
    pin: ".circle"
  },
})

tl.from(".circle", {
  scale: 0.1,
  repeat: 1,
  yoyo: true
})



/*------------/ SMANJI SEKCIJU PRIJE FOOTERA /------------*/

gsap.set('.footer-container', { yPercent: -50 })

const uncover = gsap.timeline({ paused:true })

uncover
.to('.footer-container', {yPercent: 0, ease: 'none'})
.to(".conclusion", {width:"80%", height:"80%"} ) 
;

ScrollTrigger.create({  
 scroller: ".smooth-scroll",
  trigger: '.conclusion',
  start: 'top top',
  end: '+=75%',
   animation: uncover,
  scrub: true,  
  
})

/*------------/ IMAGE REVEAL ON SCROLL /------------*/
let revealContainers = document.querySelectorAll(".img-reveal--mask");

revealContainers.forEach((container) => {
  let image = container.querySelector("img");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
       scroller: ".smooth-scroll",
      
      toggleActions: "restart none none reset"
    }
  });

  tl.set(container, { autoAlpha: 1 });
  tl.from(container, 1.5,{
     xPercent: -100,
    ease: Power2.out
  });
  tl.from(image, 1.5, {
    xPercent: 100,
    scale: 1.2,
    delay: -1.5,
    rotate:10,
    ease: Power2.out
  });
});




/*------------/ SCROLLTRIGGER INNER IMAGE PARALLAX /------------*/

var inparallax = gsap.timeline({
  scrollTrigger: {
    trigger: ".img__wrapper",
    scroller: ".smooth-scroll",
    scrub: true,
    pin: false,
  },
}); 
inparallax.from(".img__background", {
  yPercent: -80,
  ease: "none",
}).to(".img__background", {
  yPercent: 80,
  ease: "none",
}); 



/*------------/ WEEKND ZOOM IMAGES 01 /------------*/

gsap.set('.pp-parent', { perspective: 400, autoAlpha: 1})

var zoomone = gsap.timeline({
  scrollTrigger: {
  scroller: ".smooth-scroll",
    trigger:'.pp-parent',
    pin:true,
    scrub:true
  }
})
.to('.boxx', { transformOrigin:'0 0 -150', z: 400})

/*------------/ WEEKND ZOOM IMAGES 02 PERSPECTIVE /------------*/

gsap.set('.pp-parenttwo', { perspective: 400, autoAlpha: 1})

var zoomtwo = gsap.timeline({
  scrollTrigger: {
  scroller: ".smooth-scroll",
    trigger:'.pp-parenttwo',
    pin:true,
    scrub:true
  }
})

.to('.boy1', { transformOrigin: "-500% 50% -100px", 
rotationY: 45,z: 1400 })
.to('.boy2', { transformOrigin: "500% 50% -100px",  
rotationY: -45,z: 1400 },0)



/*------------/ WEEKND ZOOM IMAGES 02 /------------*/


    let LandingPageScrollTrigger = gsap.timeline({
        scrollTrigger: {
            trigger: "#ImgWrapper",
            scroller: ".smooth-scroll",
            start: "0% 0%",
            end: "100% 0%",
            pin: "#ImgWrapper",
            scrub: 2.2,
        }
    })
    LandingPageScrollTrigger
        .to('#ImgWrapper #img7', { transform: 'translateZ(4500px)', }, 0)
        .to('#ImgWrapper #img6', { transform: 'translateZ(3700px)', }, 0)
        .to('#ImgWrapper #img5', { transform: 'translateZ(3100px)', }, 0)
        .to('#ImgWrapper #img4', { transform: 'translateZ(2800px)', }, 0)
        .to('#ImgWrapper #img3', { transform: 'translateZ(2600px)', }, 0)
        //.set('#ImgWrapper #img3', { opacity: 0 }, 1.5)
        .to('#ImgWrapper #img2', { transform: 'translateZ(2400px)', }, 0)
        .to('#ImgWrapper #img1', { transform: 'translateZ(2200px)', }, 0)
        

/* SCROLLTRIGGER LERP IMAGES - DELAY without LOCOMOTIVE SCROLL*/

const delSections = document.querySelectorAll(".delayed-section");

delSections.forEach(section => {
  const containerAnim = gsap.to(section.querySelector(".inner-container"), {
    y: "100vh",
    ease: "none"
  });
  
  const imageAnim = gsap.to(section.querySelector("img"), {
    y: "-100vh",
    ease: "none",
    paused: true
  });
  
  const scrub = gsap.to(imageAnim, {
    progress: 1,
    paused: true,
    ease: "power3",
    duration: parseFloat(section.dataset.scrub) || 0.1,
    overwrite: true
  });
  
  ScrollTrigger.create({
    animation: containerAnim,
    scroller: ".smooth-scroll",
    scrub: true,
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      scrub.vars.progress = self.progress;
      scrub.invalidate().restart();
    }
  });
});

/*SCROLLTRIGGER STAGGER BLACK BOXES*/

gsap.set('.grid-element', {autoAlpha: 0, scale: 0}); 

gsap.to(".grid-element", {
  scrollTrigger: {
    trigger: ".palette",
    scroller: ".smooth-scroll",
    start: "top 70%", 
    end: "top",
    scrub: 1, 
    
  },
  scale: 1,
  autoAlpha: 1,
  stagger: {
    each: 0.1,
    from: 'start'
  }
});

/*OUTLINE TEXT OVER IMAGE MASK */

		gsap.to(".filled-text, .outline-text", {
			scrollTrigger:{
      scroller: ".smooth-scroll",
				trigger: ".filled-text, .outline-text", 
				start: "top bottom", 
				end: "bottom top", 
				scrub: 1
			},
			x: 200
		})

		gsap.to(".imagex", {
			scrollTrigger:{
      scroller: ".smooth-scroll",
				trigger: ".imagex",
				start: "top bottom", 
				end: "bottom top", 
				scrub: 1,
/*                 onRefresh: ({progress, direction, isActive}) => console.log(progress, direction, isActive)
 */
				
			},
			x: -200,

		})



/* NUMBER COUNT from zero */
const items = document.querySelectorAll(".data");

gsap.from(items, {
scrollTrigger:{
      scroller: ".smooth-scroll",
				trigger: ".counter-container",
				start: "top center", 
				end: "bottom top", 
        toggleActions: "restart none none reset",
				//scrub: 1,
				
			},
  textContent: 0,
  duration: 4,
  ease: "power1.in",
  snap: { textContent: 1 },
  stagger: {
    each: 1.0,
    onUpdate: function() {
      this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
    },
  }
});


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/* NUMBER COUNT from some value */

var cont={val:236} , newval = 246 ;

gsap.to(cont,2,{
scrollTrigger:{
      scroller: ".smooth-scroll",
				trigger: ".counter-container",
				start: "top 80%", 
				end: "bottom top", 
        toggleActions: "restart none none reset",
				//scrub: 1,
				
			},
      
val:newval,
roundProps:"val",
onUpdate:function(){
  document.getElementById("counterx").innerHTML=cont.val
}});


/* POVEĆAJ LIJEVU/DESNU STRANU ON HOVER*/
		const wrap = document.querySelector(".options-sec");
    const lft = document.querySelector(".moveleft");
    const rgt = document.querySelector(".moveright");
    
      gsap.set(lft, { width: "50%" });
      gsap.set(rgt, { width: "50%" });

    lft.addEventListener("mouseenter", () => {
      gsap.to(lft, {width: "60%" });
      gsap.to(rgt, {width: "40%" });
      
    });

    
    rgt.addEventListener("mouseenter", () => { 
      gsap.to(rgt, {width: "60%" });
      gsap.to(lft, {width: "40%" });
    
    });

    wrap.addEventListener("mouseleave", () => {
      gsap.to(lft, {width: "50%" });
      gsap.to(rgt, {width: "50%" });
     
    });
    
    
  
  /* =============================================
ROTATE ASTERISK
================================================ */

//gsap.set(cursor, {opacity:0});
gsap.to(".asterisk", {
  scrollTrigger: {
    trigger: ".rotatetrigger",
    scroller: ".smooth-scroll",
    scrub: true,
    pin: ".asterisk",
    start: "top top",
    end: "bottom 30%",
   // onUpdate: self => textProgress.innerText = self.progress.toFixed(3) + "%"
  },
  rotate: 1440, 
//  transformOrigin: "center center", 
  ease: "none"
});

  /* =============================================
MARQUEE + SCROLLTRIGGER change direction
================================================ */

let direction = 1; // 1 = forward, -1 = backward scroll

const roll1 = roll(".rollingtext", {duration: 40}), // ugasi true i mijenja smjer
      roll2 = roll(".rollingtext02", {duration: 60}),
      roll3 = roll(".rollingtext03", {duration: 80}, true);
ScrollTrigger.create({
       /* trigger: '.cd-wrap',*/
        start: "top 30%",
        end: "bottom top",
        scroller: ".smooth-scroll",
       /*  invalidateOnRefresh: true, */
         onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;
           
            gsap.to([roll1, roll2, roll3], {
                timeScale: direction, 
                overwrite: true            
            });

            
          }
        }
      });

// helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
function roll(targets, vars, reverse) {
  const tl = gsap.timeline({
    repeat: -1,
    onReverseComplete() { 
      this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
    }
  });
  vars = vars || {};
  vars.ease || (vars.ease = "none");
  gsap.utils.toArray(targets).forEach(el => {
    let clone = el.cloneNode(true);
    el.parentNode.appendChild(clone);
    gsap.set(clone, {position: "absolute", top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)});
    tl.to([el, clone], {xPercent: reverse ? 100 : -100, ...vars}, 0);
  });
  return tl;
}


  /* =============================================
TEXT REVEAL ANIMATION SPLIT BY LETTER - cameron knight
================================================ */


 // Wrap every letter in a span
 var textWrapper = document.querySelectorAll(".reveal-textx");

 gsap.registerPlugin(CustomEase);
 //gsap.registerPlugin(ScrollTrigger); 
 textWrapper.forEach(element => {
   element.innerHTML = element.textContent.replace(
   /([A-Za-z0-9'<>/.ČĆŽĐŠčćžšđ()!?\\-]+)/g,
   '<div class="word">$1</div>');


   let words = element.querySelectorAll(".word");

   words.forEach(word => {
     word.innerHTML = word.innerHTML.replace(
     /[-A-Za-z0-9!$#%^&ČĆŽĐŠčćžšđ*@()_+|~=`{}\[\]:";'<>?,.\/]/g,
     "<div class='perspective'><div class='letter'><div>$&</div></div></div>");

   });

   const letters = element.querySelectorAll(".letter");

   //CustomEase.create("hop", "M0,0 C0.425,0.005 0,1 1,1");

   let tl = gsap.timeline({
     scrollTrigger: {
        scroller: ".smooth-scroll",
        /* scrub: 3, */
       trigger: element,
       toggleActions: "restart none none reset" } });


   tl.set(element, { autoAlpha: 1 });
   tl.from(letters, 1.6, {
     transformOrigin: "center",
     rotationY: 90,
     //rotate:20,
     x: 30,
    ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 "),
     stagger: 0.025 });

 });

  /* =============================================
SHOW HIDE HEADER ON SCROLL + CUSTOM ANIMATION
================================================ */

/*  const showAnim = gsap.from('.header-hider', { 
    yPercent: -105,
    ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 "),
    paused: true,
    duration: 0.2
  }).progress(1);
    
  ScrollTrigger.create({
    scroller: ".smooth-scroll",
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
   */


/* 
  const showAnim = gsap.from('.header-hider', { 
    yPercent: -105,
    ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 "),
    paused: true,
    duration: 0.2
  }).progress(1);
     */

  /***********************/
 


  const showAnim = gsap.timeline({
    //paused: true,
    defaults: { // children inherit these defaults
      duration: 0.3,
      ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 "),
    },
    scrollTrigger: {
        scroller: ".smooth-scroll",
        start: "top top",
        end: 99999,
        onEnter: () => myfunction(),
        onLeaveBack: () => myfunction(),

        onUpdate: (self) => {
          self.direction === 1 ? showAnim.play() : showAnim.reverse()
        }
}
});


showAnim
.set(".logo-frka", {autoAlpha:1 })
.to(".logo-frka", {autoAlpha:0 }, 0)
.fromTo(".navitem", {yPercent: 0, autoAlpha:1}, {yPercent: 50, autoAlpha:0, stagger: 0.05},"<0.1")
.to(".kontakt", {backgroundColor: "transparent", x:30},"<0.2").progress(1);

var elementFirst = document.querySelector('.kontakt');

function myfunction() {
  elementFirst.classList.toggle('outline')
};

