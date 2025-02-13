import { useCallback, useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";

const dummyJWToken = `abcdefghijklmnopqrstuvwxyz0123456789`

function toCamelCase(obj: unknown) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item): unknown => toCamelCase(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
        );
        (acc as Record<string, unknown>)[camelKey] = toCamelCase(
            (obj as Record<string, unknown>)[key]
        );
        return acc;
    }, {} as Record<string, unknown>);
}

export function useFetch<TData, TBody = unknown>(
    path: string,
    options?: RequestInit & {
        transformToCamelCase?: boolean,
        needAuth?: boolean,
        isImmediate?: boolean,
        isMultiPart?: boolean,
    },
) {
    const method = options?.method || "GET";
    const immediate = options?.isImmediate === false ? options?.isImmediate : method === "GET";
    const shouldTransform = options?.transformToCamelCase ?? false;
    const navigate = useNavigate();

    const [data, setData] = useState<TData>();
    const [isLoading, setIsLoading] = useState(immediate);
    const [error, setError] = useState<Error>();

    const fetchData = useCallback(
        async (body?: TBody) => {
            setIsLoading(true);
            setError(undefined);

            try {
                if (options?.needAuth) {
                    options.headers = {...options.headers, Authorization: `Bearer ${dummyJWToken}`}
                }

                if (options?.isMultiPart === false) {
                    options.headers = {...options.headers, "Content-Type": "application/json"}
                }

                const response = await fetch(`${config.API_BASE_URL}${path}`, {
                    method,
                    headers: {
                        ...options?.headers,
                    },
                    body: options?.isMultiPart
                        ? body as FormData
                        : body
                            ? JSON.stringify(body)
                            : options?.body
                                ? JSON.stringify(options.body)
                                : undefined,
                });

                const rawResult = await response.json();
                const result: TData = shouldTransform
                    ? toCamelCase(rawResult)
                    : rawResult;

                setData(result);

                return result;
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err : new Error("An error occured"));
            } finally {
                setIsLoading(false);
            }
        },

        [path, method, shouldTransform, options?.body, options?.headers, navigate]
    );

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, isLoading, error, fetchData };
}
