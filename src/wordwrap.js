import {sum} from 'd3-array';

// while this might not be reprentative for all fonts, it is
// still better than assuming every character has the same width
// (set monospace=true if you want to bypass this)
var CHAR_W = {
    A:7,a:7,B:8,b:7,C:8,c:6,D:9,d:7,E:7,e:7,F:7,f:4,G:9,g:7,H:9,h:7,I:3,i:3,J:5,j:3,K:8,k:6,L:7,l:3,M:11,
    m:11,N:9,n:7,O:9,o:7,P:8,p:7,Q:9,q:7,R:8,r:4,S:8,s:6,T:7,t:4,U:9,u:7,V:7,v:6,W:11,w:9,X:7,x:6,Y:7,y:6,Z:7,z:5,
    '.':2,',':2,':':2,';':2
};

export default function(line, maxCharactersPerLine, minCharactersPerLine, monospace) {
    var l, lines = [], w = [], words = [], w1, maxChars, minChars, maxLineW, minLineW;
    w1 = line.split(' ');
    w1.forEach(function(s, i) {
    var w2 = s.split('-');
    var lw = (i < w1.length - 1 ? ' ' : '');
    if (w2.length > 1) {
        w2.forEach(function(t, j) {
            w.push(t + (j < w2.length - 1 ? '-' : lw));
        });
    } else {
        w.push(s + lw);
    }
    });
    maxChars = maxCharactersPerLine || 40;
    minChars = minCharactersPerLine || Math.max(3, Math.min(maxChars * 0.5, 0.75 * w.map(word_len).sort(num_asc)[Math.round(w.length / 2)]));
    maxLineW = maxChars * CHAR_W.a;
    minLineW = minChars * CHAR_W.a;
    l = 0;
    w.forEach(function(d) {
        var ww = sum(d.split('').map(char_w));
        if (l + ww > maxLineW && l > minLineW) {
            lines.push(words.join(''));
            words.length = 0;
            l = 0;
        }
        l += ww;
        return words.push(d);
    });
    if (words.length) {
        lines.push(words.join(''));
    }
    return lines.filter(function(d) {
        return d !== '';
    });
    function char_w(c) { return !monospace && CHAR_W[c] || CHAR_W.a; }
    function word_len(d) { return d.length; }
    function num_asc(a, b) { return a - b; }
}

