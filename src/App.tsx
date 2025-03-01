import { Box, Button, Container, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useCallback, useEffect, useState } from "react";
import { setLoading, setRepoUrl } from "./redux/slices/uiSlice";
import { loadRepo } from "./redux/slices/repoSlice";
import { loadIssues, setCurrentRepo } from "./redux/slices/issuesSlice";
import { Board } from "./components/Board";
import { randomRepos } from "./utils/randomRepos";
import { RepositoryInfo } from "./components/RepositoryInfo";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { owner, name, stars, error } = useSelector((state: RootState) => state.repo);
  const repoUrl = useSelector((state: RootState) => state.ui.repoUrl);
  const loading = useSelector((state: RootState) => state.ui.loading);
  const { repos, currentRepo } = useSelector((state: RootState) => state.issues);

  const [inputValue, setInputValue] = useState(repoUrl || "");

  const parseRepoUrl = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    return match ? { owner: match[1], repo: match[2] } : null;
  };

  const handleLoad = useCallback(
    (url: string) => {
      const parsed = parseRepoUrl(url);
      if (parsed) {
        const repoKey = `${parsed.owner}/${parsed.repo}`;
        dispatch(setRepoUrl(url));
        dispatch(setCurrentRepo(repoKey));
        dispatch(setLoading(true));

        Promise.all([dispatch(loadRepo(parsed)).unwrap(), dispatch(loadIssues(parsed)).unwrap()])
          .catch(() => {})
          .finally(() => dispatch(setLoading(false)));
      } else {
        alert("Invalid Github Repo Url");
      }
    },
    [dispatch],
  );

  const handleRandomRepo = () => {
    const randomUrl = randomRepos[Math.floor(Math.random() * randomRepos.length)];
    setInputValue(randomUrl);
    handleLoad(randomUrl);
  };

  useEffect(() => {
    if (repoUrl && !loading) {
      const parsed = parseRepoUrl(repoUrl);
      if (parsed) {
        const repoKey = `${parsed.owner}/${parsed.repo}`;
        if (repos[repoKey] && (!owner || !name)) {
          dispatch(setCurrentRepo(repoKey));
          handleLoad(repoUrl);
        } else if (!repos[repoKey]) {
          handleLoad(repoUrl);
        }
      }
    }
  }, [repoUrl, owner, name, loading, repos, dispatch, handleLoad]);

  return (
    <Container maxW="container.lg">
      <VStack gap={4} py={5}>
        <Box display="flex" gap={2} w="100%">
          <Input
            placeholder="Enter GitHub repo URL (e.g., https://github.com/facebook/react)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button colorPalette="teal" onClick={() => handleLoad(inputValue)}>
            Load
          </Button>
          <Button colorPalette="teal" onClick={handleRandomRepo}>
            Random 🎲
          </Button>
        </Box>

        {error ? (
          <Text color="red.500">{error}</Text>
        ) : loading ? (
          <Spinner />
        ) : repoUrl && owner && name && currentRepo && repos[currentRepo] ? (
          <>
            <RepositoryInfo owner={owner} name={name} stars={stars} />
            <Board />
          </>
        ) : (
          <Text color="gray.500">Enter a repository URL and press "Load" to fetch data.</Text>
        )}
      </VStack>
    </Container>
  );
}

export default App;
