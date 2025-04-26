# Application de Blog avec React Hooks
## Introduction 

Ce TP a pour objectif de mettre en pratique l'utilisation des hooks React (useState, useEffect, useCallback, useMemo) ainsi que la création de hooks personnalisés à travers une application de blog simple. Nous avons utilisé l'API dummyjson.com pour récupérer des données fictives de posts de blog.

## Exercice 1 : État et Effets

### Objectif
Implémenter l'affichage et la recherche de posts.

### Tâches réalisées

1. Compléter le hook usePosts : Ce hook utilise useState et useEffect pour récupérer les posts depuis l'API dummyjson.com.
2. Implémenter le composant PostList : Ce composant affiche les posts récupérés.
3. Ajouter la fonctionnalité de recherche : Le composant PostSearch permet de filtrer les posts par titre ou contenu.

### Explication de la solution

```javascript
// Hook usePosts :
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/posts');
                setPosts(response.data.posts);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default usePosts;
```

## Composant PostList :

```javascript
import React, { useState } from 'react';
import usePosts from '../hooks/usePosts';
import PostSearch from './PostSearch';

const PostList = () => {
  const { posts, loading, error } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (query) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <PostSearch onSearch={handleSearch} />
      {filteredPosts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
export default PostList;
```


# Exercice 2 : Hooks Personnalisés

## Objectif

Créer des hooks réutilisables pour optimiser la recherche et persister les préférences utilisateur.

## Tâches réalisées

1. **Créer le hook** useDebounce : Ce hook optimise la recherche en retardant la mise à jour de la valeur de recherche.
2. **Créer le hook** useLocalStorage : Ce hook permet de persister les préférences utilisateur dans le localStorage.
3. **Utiliser ces hooks dans l'application**.

## Explication de la solution

**Hook** useDebounce :

```javascript
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```
 **Hook** useLocalStorage :

 ```javascript
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

```
## Difficultés rencontrées

**Sérialisation et désérialisation** :
Manipuler les données avec JSON.stringify et JSON.parse pour stocker et récupérer des objets complexes.

# Exercice 3 : Optimisation et Context

## Objectif
Gérer le thème global et optimiser les rendus.
## Tâches réalisées
**1. Créer le ThemeContext** : Ce contexte permet de gérer le thème clair/sombre de manière globale.
**2. Implémenter le composant ThemeToggle** : Ce composant permet de basculer entre les thèmes.
**3. Utiliser useCallback et useMemo** : Ces hooks optimisent les performances en mémorisant les fonctions et les valeurs calculées.
# Explication de la solution
**Contexte** ThemeContext :
 ```javascript
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
 ```

 **Composant** ThemeToggle :
  ```javascript
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Basculer vers le thème {theme === 'light' ? 'sombre' : 'clair'}
    </button>
  );
};

export default ThemeToggle;
  ```


## Difficultés rencontrées
**Problèmes de portée** :
Erreurs comme Cannot destructure property 'theme' of 'useTheme(...)' as it is undefined, causées par l'utilisation du ThemeToggle en dehors du ThemeProvider.



# Exercice 4 : Fonctionnalités avancées

## Objectif
Ajouter des fonctionnalités de chargement et détail.

## Tâches réalisées
1. **Implémenter le chargement infini des posts** : Utilisation de useIntersectionObserver pour détecter quand l'utilisateur atteint le bas de la page.
2. **Créer le composant PostDetails** : Ce composant affiche les détails d'un post.
3. **Ajouter la fonctionnalité de filtrage par tags**.

## Explication de la solution
**Hook** useIntersectionObserver :
 ```javascript
import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (callback) => {
  const observer = useRef();
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node, callback]);

  return setNode;
};

export default useIntersectionObserver;
 ```

 **Composant** PostDetails :
  ```javascript
 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Tags: {post.tags.join(', ')}</p>
    </div>
  );
};

export default PostDetails;
  ```

 ## Difficultés rencontrées
**Callback non déclenché**:Problèmes liés à la configuration de l'observateur, comme un seuil incorrect ou un mauvais élément observé.
 
**Appels API asynchrones** :
-Gérer les erreurs lors de la récupération des données depuis l'API.
-S'assurer que l'appel API est annulé si le composant est démonté avant la fin de la requête.
fin =============================================
## Aperçu Liste 


![Aperçu de l'application](src/application-images/image_1.png)

### Première image : Page de recherche des posts

- **Barre de recherche** : Permet de filtrer les posts par titre ou contenu.
- **Boutons de filtrage par tags** : Permettent de filtrer les posts par catégories (ex. : history, american, crime).
- **Liste des posts** : Affiche les posts avec leurs titres, contenus et tags associés.


## Aperçu Details


![Aperçu de l'application](src/application-images/image_2.png)


- **Titre du post** : Affiche le titre du post en haut de la page.
- **Contenu du post** : Affiche le contenu détaillé du post.
- **Tags** : Affiche les catégories associées au post (ex. : history, american, crime).
- **URL** : Montre l'URL dynamique pour les détails du post (ex. : `localhost:3000/posts/1`).

## Difficultés rencontrées

- **React Router** :
  - Installation manquante de `react-router-dom`.
  - Oubli d'importer `useParams` dans `App.js`.

- **Contexte (Context)** :
  - `ThemeContext` mal configuré ou non englobé autour de l'application.

- **Intégration API** :
  - Erreurs lors de la récupération des données depuis l'API.

- **Routage dynamique** :
  - Difficulté à configurer des routes dynamiques pour `PostDetails`.

- **Gestion de l'état** :
  - Problèmes de filtrage des posts par tags et requêtes de recherche.
 


# Conclusion

Ce TP m'a aidé à mieux comprendre et utiliser les hooks en React. J'ai aussi appris à créer mes propres hooks pour rendre l'application plus rapide et plus agréable à utiliser. En plus, j'ai appris à gérer des données partagées et à ajouter des fonctions avancées comme le chargement infini et le tri par tags.