interface ApiResponse<T> {
  data: T;
  status: number;
}

const header = {
  Authorization: `Bearer`,
  "Content-Type": "application/json",
};

export async function getWalletBalance<T>(
  address: string
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`http/${address}`, {
      headers: header,
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Wallet Balance fetch failed", error);
    throw error;
  }
}

export async function getTransactionHistory<T>(
  address: string
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`http/${address}`, {
      headers: header,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Transaction History", error);
    throw error;
  }
}
