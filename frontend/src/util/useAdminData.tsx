import { useState, useEffect } from "react";

const useAdminData = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/${endpoint}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const deleteItem = async (item: any, type: string) => {
    try {
      let idField = "";
      if (type === "Bookings") idField = "bookingid";
      if (type === "Users") idField = "userid";
      if (type === "Rooms") idField = "roomid";

      const id = item[idField];

      if (!id) {
        throw new Error("Item ID is missing.");
      }

      let url = "";
      if (type === "Bookings") url = `/api/bookings/delete/${id}`;
      if (type === "Users") url = `/api/users/delete/${id}`;
      if (type === "Rooms") url = `/api/rooms/delete/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete item");
      }

      setData((prev) => prev.filter((item) => item[idField] !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item.");
    }
  };

  const editItem = async (id: string, updatedData: any, type: string) => {
    try {
      let url = "";
      let idField = "";

      if (type === "Users") {
        url = `/api/users/update/${id}`;
        idField = "userid";
      } else if (type === "Rooms") {
        url = `/api/rooms/update/${id}`;
        idField = "roomid";
      } else {
        throw new Error("Invalid type for editing");
      }

      if ("isadmin" in updatedData) {
        updatedData.isadmin = Boolean(updatedData.isadmin);
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update item");
      }

      setData((prev) =>
        prev.map((item) =>
          item[idField] === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (err) {
      console.error("Error updating item:", err);
      setError("Failed to update item.");
    }
  };

  return { data, loading, error, deleteItem, editItem };
};

export default useAdminData;
