var hrml_hst="",hrml_xq=[]
function hrml(c){var r="",s="",u=0,b="";
	for(var i=0;i<c.length;i++){r+=c[i];
		if(c[i]=="<"){
			if(u==0){s+=r.substr(0,r.length-1);r="<"}u++
		}else if(c[i]==">"){
			if(u==1){var d=0,t="",n="",q=0
				while(true){
					if(r[++d]=="\""){if(q)q--;else q++}
					if(">/".search(r[d])>-1&&!q)break;
					t+=r[d];if(d>r.length-1)break
				}while(t.search("  ")>-1)t=t.replace("  "," ")
				var p=t.trim(),g=p.split(" ")[0],w=t.split(" "),
					h=hrml_hst.split(" "),k=b.split(" ");
				if(g[0]!="%"){if(g!="~")hrml_hst=t;if(g!="#")b=t}
				if(p=="~"){g=h[0];p=hrml_hst}
				else if(g=="~"){var v=h[0];g=v;
					for(var j=1;j<w.length;j++){
						if(w[j].search("=")>-1){v+=" "+w[j];continue}
						if(w[j].search("&")>-1){
							var x=w[j].split("&")[1];v+=" "+h[x]
						}else v+=" "+w[j]
					}p=v.trim();hrml_hst=p
				}
				if(p=="#"){g=k[0];p=b}
				else if(g=="#"){var v=k[0];g=v;
					for(var j=1;j<w.length;j++){
						if(w[j].search("=")>-1){v+=" "+w[j];continue}
						if(w[j].search("&")>-1){
							var x=w[j].split("&")[1];v+=" "+k[x]
						}else v+=" "+w[j]
					}p=v.trim();b=p
				}
				if(g[0]=="%"){
					var x=g.split(" ")[0].split("%")[1],l=hrml_xq[x*1-1].split(" "),v=l[0];
					if(p==g)p=hrml_xq[x*1-1];
					else{
						for(var j=1;j<w.length;j++){
							if(w[j].search("=")>-1){v+=" "+w[j];continue}
							if(w[j].search("&")>-1){
								var x=w[j].split("&")[1];v+=" "+l[x]
							}else v+=" "+w[j]
						}p=v.trim();hrml_hst=p;b=p
					}g=l[0]
				}
				if(p.split(" ").indexOf("%")>-1){
					p=p.replace(" %","").replace("  ","");hrml_xq.push(p)
				}n=hrml(r.substr(d+1,r.length-d-2));
				if("br hr input img meta".search(g)>-1)s+="<"+p+"/>"+n;
				else s+="<"+p+">"+n+"</"+g+">";r="";u=0
			}else u--
		}
	}return s+r
}
function hrmlf(u){
    var r=new XMLHttpRequest();
    r.open('GET',u,true);r.send(null);
    r.onreadystatechange=function(){
		if(r.readyState==4&&r.status==200){
			var type=r.getResponseHeader('Content-Type');
			if(type.indexOf("text")!=1){
				hrmlw(r.responseText)
			}
		}
	}
}
function hrmlw(c){document.write(hrml(c));document.close()}
