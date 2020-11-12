export default `<p>Type assertions have two forms.
One is the "angle-bracket" syntax:</p>
<pre class="shiki twoslash lsp"><div class='code-container'><code><span style="color: #545454">// import {$node} from &apos;fufu&apos;</span>

<span style="color: #C792EA">const</span><span style="color: #FFFFFF"> </span><span style="color: #EEFFFF"><data-lsp lsp='const ww: Window &amp;amp; typeof globalThis'>ww</data-lsp></span><span style="color: #FFFFFF"> </span><span style="color: #C792EA">=</span><span style="color: #FFFFFF"> <data-lsp lsp='var window: Window &amp;amp; typeof globalThis'>window</data-lsp></span></code><a href='https://www.typescriptlang.org/play/#code/PTAEEsFsAcHsCcAuoDeASAdrAJgUwL6gBm8skoA5EQK40UBQ9AxrBgM7IDunoAvKJ3AZssTvSA'>Try</a></div></pre>
<p>And the other is the <code>as</code>-syntax:</p>
<pre class="shiki twoslash lsp"><div class='code-container'><code><span style="color: #C792EA">let</span><span style="color: #FFFFFF"> </span><span style="color: #EEFFFF"><data-lsp lsp='let someValue: any'>someValue</data-lsp></span><span style="color: #C792EA">:</span><span style="color: #FFFFFF"> </span><span style="color: #B2CCD6">any</span><span style="color: #FFFFFF"> </span><span style="color: #C792EA">=</span><span style="color: #FFFFFF"> </span><span style="color: #89DDFF">"</span><span style="color: #C3E88D">this is a string</span><span style="color: #89DDFF">"</span>

<span style="color: #C792EA">let</span><span style="color: #FFFFFF"> </span><span style="color: #EEFFFF"><data-lsp lsp='let strLength: number'>strLength</data-lsp></span><span style="color: #C792EA">:</span><span style="color: #FFFFFF"> </span><span style="color: #B2CCD6">number</span><span style="color: #FFFFFF"> </span><span style="color: #C792EA">=</span><span style="color: #FFFFFF"> (</span><span style="color: #EEFFFF"><data-lsp lsp='let someValue: any'>someValue</data-lsp></span><span style="color: #FFFFFF"> </span><span style="color: #89DDFF">as</span><span style="color: #FFFFFF"> </span><span style="color: #B2CCD6">string</span><span style="color: #FFFFFF">)</span><span style="color: #89DDFF">.</span><span style="color: #FFFFFF"><data-lsp lsp='(property) String.length: number'>length</data-lsp></span></code><a href='https://www.typescriptlang.org/play/#code/DYUwLgBAzg9gtiAagQ2AVxALgsgdgTwgF4IAiMACwEsoIadowAnK3Ac1IChPRIpmAMiHaVsuNHABGIJsQgAKWAhToQOWvxbsAlADpQIikA'>Try</a></div></pre>
<p>The two samples are equivalent.
Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only <code>as</code>-style assertions are allowed.</p>`