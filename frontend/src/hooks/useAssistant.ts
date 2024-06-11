import { useCallback } from "react";
import { useState } from "react";
import {
  AssistantSchema,
  djangoAiAssistantViewsListAssistants,
} from "../client";

/**
 * React hook to manage the Assistant resource.
 */
export function useAssistant() {
  const [assistants, setAssistants] = useState<AssistantSchema[] | null>(null);
  const [loadingFetchAssistants, setLoadingFetchAssistants] =
    useState<boolean>(false);

  /**
   * Fetches a list of AI assistants.
   *
   * @returns A promise that resolves with the fetched list of AI assistants.
   */
  const fetchAssistants = useCallback(async (): Promise<AssistantSchema[]> => {
    try {
      setLoadingFetchAssistants(true);
      const fetchedAssistants = await djangoAiAssistantViewsListAssistants();
      setAssistants(fetchedAssistants);
      return fetchedAssistants;
    } finally {
      setLoadingFetchAssistants(false);
    }
  }, []);

  return {
    /**
     * Function to fetch AI assistants from the server.
     */
    fetchAssistants,
    /**
     * List of fetched AI assistants.
     */
    assistants,
    /**
     * Loading state of the fetch operation.
     */
    loadingFetchAssistants,
  };
}