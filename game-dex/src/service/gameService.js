

export async function searchGamesByName({ name, page = 1, page_size = 10 }) {
  const url = `http://127.0.0.1:8000/api/games/search?name=${encodeURIComponent(name)}&page=${page}&page_size=${page_size}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro na busca por nome");
  return response.json();
}


export async function listGames({ page = 1, page_size = 10 }) {
  const url = `http://127.0.0.1:8000/api/games?page=${page}&page_size=${page_size}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao listar jogos");
  return response.json();
}

export async function fetchGames({ page, checkedPlataformas, checkedGeneros, checkedDevs, searchTerm, bestOfYear, popular2024, bestOfAllTime }) {
  const generoSlugMap = {
    "Ação": "action",
    "Indie": "indie",
    "Aventura": "adventure",
    "RPG": "role-playing-games-rpg",
    "Estratégia": "strategy",
    "Shooter": "shooter",
    "Casual": "casual",
    "Simulação": "simulation",
    "Puzzle": "puzzle",
    "Arcade": "arcade",
    "Platformer": "platformer",
    "Massively Multiplayer": "massively-multiplayer",
    "Racing": "racing",
    "Esporte": "sports",
    "Fighting": "fighting",
    "Família": "family",
    "Board Games": "board-games",
    "Educacional": "educational",
    "Card": "card"
  };

  const devSlugMap = {
    "Rockstar Games": "rockstar-games",
    "Rockstar": "rockstar-games",
    "Microsoft": "microsoft",
    "Sony": "sony-interactive-entertainment",
    "Nintendo": "nintendo",
    "Ubisoft": "ubisoft"
  };

  const plataformaFamiliaMap = {
    "PC": [4],
    "PlayStation": [187, 18, 16, 15, 27, 19, 17],
    "Xbox": [1, 186, 14, 80],
    "Nintendo Switch": [7],
    "Nintendo": [7, 8, 9, 13, 10, 11, 105, 83, 24, 43, 26, 79, 49],
    "Android": [21],
    "iOS": [3],
  };

  let url = `http://127.0.0.1:8000/api/games/filter?page=${page}&page_size=20`;

  if (checkedGeneros && checkedGeneros.length > 0) {
    const slug = generoSlugMap[checkedGeneros[0]] || checkedGeneros[0];
    url += `&genre=${encodeURIComponent(slug)}`;
  }
  if (checkedDevs && checkedDevs.length > 0) {
    const devSlug = devSlugMap[checkedDevs[0]] || checkedDevs[0];
    url += `&developer=${encodeURIComponent(devSlug)}`;
  }
  if (checkedPlataformas && checkedPlataformas.length > 0) {
    const allIds = checkedPlataformas
      .flatMap(nome => plataformaFamiliaMap[nome] || [])
      .join(",");
    if (allIds) {
      url += `&platform=${encodeURIComponent(allIds)}`;
    }
  }
  if (searchTerm && searchTerm.trim() !== "") {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }
  if (bestOfYear) {
    url += `&best_of_year=true`;
  }
  if (popular2024) {
    url += `&popular_2024=true`;
  }
  if (bestOfAllTime) {
    url += `&best_of_all_time=true`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro na requisição");
  return response.json();
}

export async function addGameToUser({ user, token, game }) {
  const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: game.name,
      rawg_id: game.id,
      background_img: game.background_image,
      platforms: game.platforms
        ? game.platforms.map(p => p.platform ? p.platform.name : p.name).join(', ')
        : "",
    }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar jogo.');
  return response.json();
}


export async function updateUserGame({ userId, gameId, comment, rating, progress, status }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/users/${userId}/games/${gameId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment || null,
        rating: rating ? Number(rating) : null,
        progress: progress || null,
        status: status || null, // <-- Adicione esta linha
      }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Erro ao atualizar jogo");
  }
  return response.json();
}

export async function removeUserGame({ userId, gameId }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/users/${userId}/games/${gameId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Erro ao remover jogo");
  }
  return true;
}

export async function fetchUserGameDetail({ userId, gameId }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/users/${userId}/games/${gameId}`
  );
  if (!response.ok) throw new Error("Erro ao buscar detalhes do jogo");
  return response.json();
}

export async function fetchUserGames({ userId, token }) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/users/${userId}/games`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error("Erro ao buscar jogos do usuário");
  return response.json();
}
