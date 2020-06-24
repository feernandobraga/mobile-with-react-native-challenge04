import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repos, setRepos] = useState([]);

  // use effect that call the api to populate the repositories
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    /**
     * This function will get the id and find the position of that repository in the array, based on the given id.
     * Then it increments the likes, and posts to the api.
     * Lastly, it updates the array of repositories locally
     */

    const repoIndex = repos.findIndex((repo) => repo.id === id);

    const updatedRepos = repos;

    let likes = updatedRepos[repoIndex].likes;
    likes++;
    updatedRepos[repoIndex].likes = likes;

    const response = await api.post(`repositories/${id}/like`);

    setRepos([...updatedRepos]);

    // updatedRepo.likes = likes;

    // repos[repoIndex] = updatedRepo;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repos.map((repo) => (
          <View key={repo.id} style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repo.title}</Text>

            <View style={styles.techsContainer}>
              {repo.techs.map((tech) => (
                <Text key={tech} style={styles.tech}>
                  {tech}
                </Text>
              ))}
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${repo.id}`}
              >
                {repo.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repo.id)}
              testID={`like-button-${repo.id}`}
            >
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
