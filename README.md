# Rapport de TP : Application de Blog avec React Hooks

## Introduction

Ce TP a pour objectif de mettre en pratique l'utilisation des hooks React (`useState`, `useEffect`, `useCallback`, `useMemo`) ainsi que la création de hooks personnalisés à travers une application de blog simple. Nous avons utilisé l'API dummyjson.com pour récupérer des données fictives de posts de blog.

## Exercice 1 : État et Effets

### Objectif

Implémenter l'affichage et la recherche de posts.

### Tâches réalisées

1. **Compléter le hook `usePosts`** : Ce hook utilise `useState` et `useEffect` pour récupérer les posts depuis l'API dummyjson.com.
2. **Implémenter le composant `PostList`** : Ce composant affiche les posts récupérés.
3. **Ajouter la fonctionnalité de recherche** : Le composant `PostSearch` permet de filtrer les posts par titre ou contenu.

### Explication de la solution

* **Hook `usePosts`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">{</span><span class="token"> useState</span><span class="token">,</span><span class="token"> useEffect </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span><span></span><span class="token">import</span><span> </span><span class="token">axios</span><span> </span><span class="token">from</span><span> </span><span class="token">'axios'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">usePosts</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>posts</span><span class="token">,</span><span> setPosts</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token">[</span><span class="token">]</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>loading</span><span class="token">,</span><span> setLoading</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token">true</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>error</span><span class="token">,</span><span> setError</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token null nil">null</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">useEffect</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">const</span><span> </span><span class="token function-variable">fetchPosts</span><span> </span><span class="token">=</span><span> </span><span class="token">async</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">try</span><span> </span><span class="token">{</span><span>
  </span><span>        </span><span class="token">const</span><span> response </span><span class="token">=</span><span> </span><span class="token">await</span><span> axios</span><span class="token">.</span><span class="token method property-access">get</span><span class="token">(</span><span class="token">'https://dummyjson.com/posts'</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setPosts</span><span class="token">(</span><span>response</span><span class="token">.</span><span class="token property-access">data</span><span class="token">.</span><span class="token property-access">posts</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setLoading</span><span class="token">(</span><span class="token">false</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">}</span><span> </span><span class="token">catch</span><span> </span><span class="token">(</span><span>err</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>        </span><span class="token">setError</span><span class="token">(</span><span>err</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setLoading</span><span class="token">(</span><span class="token">false</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">}</span><span>
  </span><span>    </span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span>    </span><span class="token">fetchPosts</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">,</span><span> </span><span class="token">[</span><span class="token">]</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">{</span><span> posts</span><span class="token">,</span><span> loading</span><span class="token">,</span><span> error </span><span class="token">}</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> usePosts</span><span class="token">;</span></code></div></div></pre>
* **Composant `PostList`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">React</span><span class="token">,</span><span class="token"> </span><span class="token">{</span><span class="token"> useState </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span><span></span><span class="token">import</span><span> </span><span class="token">usePosts</span><span> </span><span class="token">from</span><span> </span><span class="token">'../hooks/usePosts'</span><span class="token">;</span><span>
  </span><span></span><span class="token">import</span><span> </span><span class="token">PostSearch</span><span> </span><span class="token">from</span><span> </span><span class="token">'./PostSearch'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">PostList</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">{</span><span> posts</span><span class="token">,</span><span> loading</span><span class="token">,</span><span> error </span><span class="token">}</span><span> </span><span class="token">=</span><span> </span><span class="token">usePosts</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>filteredPosts</span><span class="token">,</span><span> setFilteredPosts</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span>posts</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">const</span><span> </span><span class="token function-variable">handleSearch</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">query</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">const</span><span> filtered </span><span class="token">=</span><span> posts</span><span class="token">.</span><span class="token method property-access">filter</span><span class="token">(</span><span class="token">post</span><span> </span><span class="token">=></span><span>
  </span><span>      post</span><span class="token">.</span><span class="token property-access">title</span><span class="token">.</span><span class="token method property-access">toLowerCase</span><span class="token">(</span><span class="token">)</span><span class="token">.</span><span class="token method property-access">includes</span><span class="token">(</span><span>query</span><span class="token">.</span><span class="token method property-access">toLowerCase</span><span class="token">(</span><span class="token">)</span><span class="token">)</span><span> </span><span class="token">||</span><span>
  </span><span>      post</span><span class="token">.</span><span class="token property-access">body</span><span class="token">.</span><span class="token method property-access">toLowerCase</span><span class="token">(</span><span class="token">)</span><span class="token">.</span><span class="token method property-access">includes</span><span class="token">(</span><span>query</span><span class="token">.</span><span class="token method property-access">toLowerCase</span><span class="token">(</span><span class="token">)</span><span class="token">)</span><span>
  </span><span>    </span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">setFilteredPosts</span><span class="token">(</span><span>filtered</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">if</span><span> </span><span class="token">(</span><span>loading</span><span class="token">)</span><span> </span><span class="token">return</span><span> </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">Chargement</span><span class="token spread">...</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span class="token">;</span><span>
  </span><span>  </span><span class="token">if</span><span> </span><span class="token">(</span><span>error</span><span class="token">)</span><span> </span><span class="token">return</span><span> </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">Erreur</span><span> </span><span class="token">:</span><span> </span><span class="token">{</span><span>error</span><span class="token">.</span><span class="token property-access">message</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">(</span><span>
  </span><span>    </span><span class="token"><</span><span>div</span><span class="token">></span><span>
  </span><span>      </span><span class="token"><</span><span class="token">PostSearch</span><span> onSearch</span><span class="token">=</span><span class="token">{</span><span>handleSearch</span><span class="token">}</span><span> </span><span class="token">/</span><span class="token">></span><span>
  </span><span>      </span><span class="token">{</span><span>filteredPosts</span><span class="token">.</span><span class="token method property-access">map</span><span class="token">(</span><span class="token">post</span><span> </span><span class="token">=></span><span> </span><span class="token">(</span><span>
  </span><span>        </span><span class="token"><</span><span>div key</span><span class="token">=</span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">id</span><span class="token">}</span><span class="token">></span><span>
  </span><span>          </span><span class="token"><</span><span>h2</span><span class="token">></span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">title</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>h2</span><span class="token">></span><span>
  </span><span>          </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">body</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span>
  </span><span>        </span><span class="token"><</span><span class="token">/</span><span>div</span><span class="token">></span><span>
  </span><span>      </span><span class="token">)</span><span class="token">)</span><span class="token">}</span><span>
  </span><span>    </span><span class="token"><</span><span class="token">/</span><span>div</span><span class="token">></span><span>
  </span><span>  </span><span class="token">)</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> </span><span class="token">PostList</span><span class="token">;</span></code></div></div></pre>

### Difficultés rencontrées

* La gestion des états de chargement et d'erreur a nécessité une attention particulière pour éviter des rendus inutiles.

## Exercice 2 : Hooks Personnalisés

### Objectif

Créer des hooks réutilisables pour optimiser la recherche et persister les préférences utilisateur.

### Tâches réalisées

1. **Créer le hook `useDebounce`** : Ce hook optimise la recherche en retardant la mise à jour de la valeur de recherche.
2. **Créer le hook `useLocalStorage`** : Ce hook permet de persister les préférences utilisateur dans le `localStorage`.
3. **Utiliser ces hooks dans l'application**.

### Explication de la solution

* **Hook `useDebounce`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">{</span><span class="token"> useState</span><span class="token">,</span><span class="token"> useEffect </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">useDebounce</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">value</span><span class="token">,</span><span class="token"> delay</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>debouncedValue</span><span class="token">,</span><span> setDebouncedValue</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span>value</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">useEffect</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">const</span><span> handler </span><span class="token">=</span><span> </span><span class="token">setTimeout</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">setDebouncedValue</span><span class="token">(</span><span>value</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span class="token">,</span><span> delay</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>    </span><span class="token">return</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">clearTimeout</span><span class="token">(</span><span>handler</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">,</span><span> </span><span class="token">[</span><span>value</span><span class="token">,</span><span> delay</span><span class="token">]</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> debouncedValue</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> useDebounce</span><span class="token">;</span></code></div></div></pre>
* **Hook `useLocalStorage`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">{</span><span class="token"> useState</span><span class="token">,</span><span class="token"> useEffect </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">useLocalStorage</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">key</span><span class="token">,</span><span class="token"> initialValue</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>storedValue</span><span class="token">,</span><span> setStoredValue</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">try</span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">const</span><span> item </span><span class="token">=</span><span> </span><span class="token dom">window</span><span class="token">.</span><span class="token property-access">localStorage</span><span class="token">.</span><span class="token method property-access">getItem</span><span class="token">(</span><span>key</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">return</span><span> item </span><span class="token">?</span><span> </span><span class="token known-class-name">JSON</span><span class="token">.</span><span class="token method property-access">parse</span><span class="token">(</span><span>item</span><span class="token">)</span><span> </span><span class="token">:</span><span> initialValue</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span> </span><span class="token">catch</span><span> </span><span class="token">(</span><span>error</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">console</span><span class="token">.</span><span class="token method property-access">error</span><span class="token">(</span><span>error</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">return</span><span> initialValue</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">const</span><span> </span><span class="token function-variable">setValue</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">value</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">try</span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">setStoredValue</span><span class="token">(</span><span>value</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token dom">window</span><span class="token">.</span><span class="token property-access">localStorage</span><span class="token">.</span><span class="token method property-access">setItem</span><span class="token">(</span><span>key</span><span class="token">,</span><span> </span><span class="token known-class-name">JSON</span><span class="token">.</span><span class="token method property-access">stringify</span><span class="token">(</span><span>value</span><span class="token">)</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span> </span><span class="token">catch</span><span> </span><span class="token">(</span><span>error</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">console</span><span class="token">.</span><span class="token method property-access">error</span><span class="token">(</span><span>error</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">[</span><span>storedValue</span><span class="token">,</span><span> setValue</span><span class="token">]</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> useLocalStorage</span><span class="token">;</span></code></div></div></pre>

### Difficultés rencontrées

* La gestion des dépendances dans les hooks a nécessité une compréhension approfondie pour éviter les boucles infinies de rendu.

## Exercice 3 : Optimisation et Context

### Objectif

Gérer le thème global et optimiser les rendus.

### Tâches réalisées

1. **Créer le `ThemeContext`** : Ce contexte permet de gérer le thème clair/sombre de manière globale.
2. **Implémenter le composant `ThemeToggle`** : Ce composant permet de basculer entre les thèmes.
3. **Utiliser `useCallback` et `useMemo`** : Ces hooks optimisent les performances en mémorisant les fonctions et les valeurs calculées.

### Explication de la solution

* **Contexte `ThemeContext`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">React</span><span class="token">,</span><span class="token"> </span><span class="token">{</span><span class="token"> createContext</span><span class="token">,</span><span class="token"> useContext</span><span class="token">,</span><span class="token"> useState </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token">ThemeContext</span><span> </span><span class="token">=</span><span> </span><span class="token">createContext</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">const</span><span> </span><span class="token function-variable">ThemeProvider</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">{</span><span class="token"> children </span><span class="token">}</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>theme</span><span class="token">,</span><span> setTheme</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token">'light'</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">const</span><span> </span><span class="token function-variable">toggleTheme</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">setTheme</span><span class="token">(</span><span class="token">(</span><span class="token">prevTheme</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">(</span><span>prevTheme </span><span class="token">===</span><span> </span><span class="token">'light'</span><span> </span><span class="token">?</span><span> </span><span class="token">'dark'</span><span> </span><span class="token">:</span><span> </span><span class="token">'light'</span><span class="token">)</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">(</span><span>
  </span><span>    </span><span class="token"><</span><span class="token">ThemeContext</span><span class="token">.</span><span class="token property-access">Provider</span><span> value</span><span class="token">=</span><span class="token">{</span><span class="token">{</span><span> theme</span><span class="token">,</span><span> toggleTheme </span><span class="token">}</span><span class="token">}</span><span class="token">></span><span>
  </span><span>      </span><span class="token">{</span><span>children</span><span class="token">}</span><span>
  </span><span>    </span><span class="token"><</span><span class="token">/</span><span class="token">ThemeContext</span><span class="token">.</span><span class="token property-access">Provider</span><span class="token">></span><span>
  </span><span>  </span><span class="token">)</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">const</span><span> </span><span class="token function-variable">useTheme</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">return</span><span> </span><span class="token">useContext</span><span class="token">(</span><span class="token">ThemeContext</span><span class="token">)</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span></code></div></div></pre>
* **Composant `ThemeToggle`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">React</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span><span></span><span class="token">import</span><span> </span><span class="token">{</span><span class="token"> useTheme </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'../context/ThemeContext'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">ThemeToggle</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">{</span><span> theme</span><span class="token">,</span><span> toggleTheme </span><span class="token">}</span><span> </span><span class="token">=</span><span> </span><span class="token">useTheme</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">(</span><span>
  </span><span>    </span><span class="token"><</span><span>button onClick</span><span class="token">=</span><span class="token">{</span><span>toggleTheme</span><span class="token">}</span><span class="token">></span><span>
  </span><span>      </span><span class="token">Basculer</span><span> vers le thème </span><span class="token">{</span><span>theme </span><span class="token">===</span><span> </span><span class="token">'light'</span><span> </span><span class="token">?</span><span> </span><span class="token">'sombre'</span><span> </span><span class="token">:</span><span> </span><span class="token">'clair'</span><span class="token">}</span><span>
  </span><span>    </span><span class="token"><</span><span class="token">/</span><span>button</span><span class="token">></span><span>
  </span><span>  </span><span class="token">)</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> </span><span class="token">ThemeToggle</span><span class="token">;</span></code></div></div></pre>

### Difficultés rencontrées

* La mise en place du contexte a nécessité une bonne compréhension de la propagation des valeurs dans l'arbre des composants.

## Exercice 4 : Fonctionnalités avancées

### Objectif

Ajouter des fonctionnalités de chargement et détail.

### Tâches réalisées

1. **Implémenter le chargement infini des posts** : Utilisation de `useIntersectionObserver` pour détecter quand l'utilisateur atteint le bas de la page.
2. **Créer le composant `PostDetails`** : Ce composant affiche les détails d'un post.
3. **Ajouter la fonctionnalité de filtrage par tags**.

### Explication de la solution

* **Hook `useIntersectionObserver`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">{</span><span class="token"> useEffect</span><span class="token">,</span><span class="token"> useRef</span><span class="token">,</span><span class="token"> useState </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">useIntersectionObserver</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">callback</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> observer </span><span class="token">=</span><span> </span><span class="token">useRef</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>node</span><span class="token">,</span><span> setNode</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token null nil">null</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">useEffect</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">if</span><span> </span><span class="token">(</span><span>observer</span><span class="token">.</span><span class="token property-access">current</span><span class="token">)</span><span> observer</span><span class="token">.</span><span class="token property-access">current</span><span class="token">.</span><span class="token method property-access">disconnect</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>    observer</span><span class="token">.</span><span class="token property-access">current</span><span> </span><span class="token">=</span><span> </span><span class="token">new</span><span> </span><span class="token">IntersectionObserver</span><span class="token">(</span><span class="token">(</span><span class="token">entries</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">if</span><span> </span><span class="token">(</span><span>entries</span><span class="token">[</span><span class="token">0</span><span class="token">]</span><span class="token">.</span><span class="token property-access">isIntersecting</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>        </span><span class="token">callback</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">}</span><span>
  </span><span>    </span><span class="token">}</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>    </span><span class="token">const</span><span> </span><span class="token">{</span><span> </span><span class="token literal-property">current</span><span class="token">:</span><span> currentObserver </span><span class="token">}</span><span> </span><span class="token">=</span><span> observer</span><span class="token">;</span><span>
  </span>
  <span>    </span><span class="token">if</span><span> </span><span class="token">(</span><span>node</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>      currentObserver</span><span class="token">.</span><span class="token method property-access">observe</span><span class="token">(</span><span>node</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>    </span><span class="token">}</span><span>
  </span>
  <span>    </span><span class="token">return</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> currentObserver</span><span class="token">.</span><span class="token method property-access">disconnect</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">,</span><span> </span><span class="token">[</span><span>node</span><span class="token">,</span><span> callback</span><span class="token">]</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> setNode</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> useIntersectionObserver</span><span class="token">;</span></code></div></div></pre>
* **Composant `PostDetails`** :
  <pre><div class="relative rounded-md border border-default bg-[#1e1e1e] dark:bg-subtle"><div class="sticky top-0 mb-1 flex items-center justify-end gap-1 rounded-t-md bg-[#1e1e1e] px-2 font-sans dark:bg-subtle"><button class="disabled:pointer-auto focus-visible:outline-hidden items-center justify-center whitespace-nowrap rounded-md font-normal transition-colors disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 disabled:text-hint flex h-auto gap-1.5 px-1 py-2 text-xs text-inverted-muted hover:bg-none! hover:text-inverted-subtle dark:text-subtle dark:hover:text-muted" type="button" aria-label="Copy code to clipboard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy size-6 shrink-0"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>Copy</button></div><div node="[object Object]" class="rounded-b-md select-text dark:bg-subtle!"><code class="language-javascript"><span class="token">import</span><span> </span><span class="token">React</span><span class="token">,</span><span class="token"> </span><span class="token">{</span><span class="token"> useEffect</span><span class="token">,</span><span class="token"> useState </span><span class="token">}</span><span> </span><span class="token">from</span><span> </span><span class="token">'react'</span><span class="token">;</span><span>
  </span><span></span><span class="token">import</span><span> </span><span class="token">axios</span><span> </span><span class="token">from</span><span> </span><span class="token">'axios'</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">const</span><span> </span><span class="token function-variable">PostDetails</span><span> </span><span class="token">=</span><span> </span><span class="token">(</span><span class="token">{</span><span class="token"> postId </span><span class="token">}</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>post</span><span class="token">,</span><span> setPost</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token null nil">null</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>loading</span><span class="token">,</span><span> setLoading</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token">true</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">const</span><span> </span><span class="token">[</span><span>error</span><span class="token">,</span><span> setError</span><span class="token">]</span><span> </span><span class="token">=</span><span> </span><span class="token">useState</span><span class="token">(</span><span class="token null nil">null</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">useEffect</span><span class="token">(</span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>    </span><span class="token">const</span><span> </span><span class="token function-variable">fetchPostDetails</span><span> </span><span class="token">=</span><span> </span><span class="token">async</span><span> </span><span class="token">(</span><span class="token">)</span><span> </span><span class="token">=></span><span> </span><span class="token">{</span><span>
  </span><span>      </span><span class="token">try</span><span> </span><span class="token">{</span><span>
  </span><span>        </span><span class="token">const</span><span> response </span><span class="token">=</span><span> </span><span class="token">await</span><span> axios</span><span class="token">.</span><span class="token method property-access">get</span><span class="token">(</span><span class="token template-string template-punctuation">`</span><span class="token template-string">https://dummyjson.com/posts/</span><span class="token template-string">${</span><span class="token template-string">postId</span><span class="token template-string">}</span><span class="token template-string template-punctuation">`</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setPost</span><span class="token">(</span><span>response</span><span class="token">.</span><span class="token property-access">data</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setLoading</span><span class="token">(</span><span class="token">false</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">}</span><span> </span><span class="token">catch</span><span> </span><span class="token">(</span><span>err</span><span class="token">)</span><span> </span><span class="token">{</span><span>
  </span><span>        </span><span class="token">setError</span><span class="token">(</span><span>err</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>        </span><span class="token">setLoading</span><span class="token">(</span><span class="token">false</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>      </span><span class="token">}</span><span>
  </span><span>    </span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span>    </span><span class="token">fetchPostDetails</span><span class="token">(</span><span class="token">)</span><span class="token">;</span><span>
  </span><span>  </span><span class="token">}</span><span class="token">,</span><span> </span><span class="token">[</span><span>postId</span><span class="token">]</span><span class="token">)</span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">if</span><span> </span><span class="token">(</span><span>loading</span><span class="token">)</span><span> </span><span class="token">return</span><span> </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">Chargement</span><span class="token spread">...</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span class="token">;</span><span>
  </span><span>  </span><span class="token">if</span><span> </span><span class="token">(</span><span>error</span><span class="token">)</span><span> </span><span class="token">return</span><span> </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">Erreur</span><span> </span><span class="token">:</span><span> </span><span class="token">{</span><span>error</span><span class="token">.</span><span class="token property-access">message</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span class="token">;</span><span>
  </span>
  <span>  </span><span class="token">return</span><span> </span><span class="token">(</span><span>
  </span><span>    </span><span class="token"><</span><span>div</span><span class="token">></span><span>
  </span><span>      </span><span class="token"><</span><span>h2</span><span class="token">></span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">title</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>h2</span><span class="token">></span><span>
  </span><span>      </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">body</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span>
  </span><span>      </span><span class="token"><</span><span>p</span><span class="token">></span><span class="token">Tags</span><span class="token">:</span><span> </span><span class="token">{</span><span>post</span><span class="token">.</span><span class="token property-access">tags</span><span class="token">.</span><span class="token method property-access">join</span><span class="token">(</span><span class="token">', '</span><span class="token">)</span><span class="token">}</span><span class="token"><</span><span class="token">/</span><span>p</span><span class="token">></span><span>
  </span><span>    </span><span class="token"><</span><span class="token">/</span><span>div</span><span class="token">></span><span>
  </span><span>  </span><span class="token">)</span><span class="token">;</span><span>
  </span><span></span><span class="token">}</span><span class="token">;</span><span>
  </span>
  <span></span><span class="token">export</span><span> </span><span class="token">default</span><span> </span><span class="token">PostDetails</span><span class="token">;</span></code></div></div></pre>

### Difficultés rencontrées

* La gestion du chargement infini a nécessité une bonne compréhension de l'API IntersectionObserver.

## Conclusion

Ce TP m'a permis de mieux comprendre et maîtriser les hooks React, ainsi que de créer des hooks personnalisés pour optimiser les performances et améliorer l'expérience utilisateur. J'ai également appris à gérer le contexte global et à implémenter des fonctionnalités avancées comme le chargement infini et le filtrage par tags.

## Ressources utiles

* **Documentation de l'API** : [https://dummyjson.com/docs/posts](https://dummyjson.com/docs/posts)
* **Documentation React Hooks** : [https://fr.reactjs.org/docs/hooks-intro.html](https://fr.reactjs.org/docs/hooks-intro.html)
* **Guide sur les hooks personnalisés** : [https://fr.reactjs.org/docs/hooks-custom.html](https://fr.reactjs.org/docs/hooks-custom.html)
