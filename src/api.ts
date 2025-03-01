import axios from 'axios'

const API_BASE_URL = 'https://api.github.com/repos' ;

export const fetchRepo = async (owner: string, repo: string) => {
  const response = await axios.get(`${API_BASE_URL}/${owner}/${repo}`);
  return response.data;
}

export const fetchIssues = async (owner: string, repo: string)  => {
  const response = await axios.get(`${API_BASE_URL}/${owner}/${repo}/issues`, {
    params: {
      state: 'all',
    },
  });
  return response.data;
}