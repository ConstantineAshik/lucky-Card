type UrlState = {
  seed: number | null;
  picked: string | null;
};

type UrlOptions = {
  replace?: boolean;
};

export const readSeedFromUrl = (): number | null => {
  const params = new URLSearchParams(window.location.search);
  const seedValue = params.get("seed");

  if (!seedValue) {
    return null;
  }

  const parsed = Number(seedValue);
  return Number.isFinite(parsed) ? parsed : null;
};

export const readPickedFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get("picked");
};

export const setUrlState = ({ seed, picked }: UrlState, options: UrlOptions = {}) => {
  const params = new URLSearchParams(window.location.search);
  const { replace = true } = options;

  if (seed !== null) {
    params.set("seed", String(seed));
  } else {
    params.delete("seed");
  }

  if (picked) {
    params.set("picked", picked);
  } else {
    params.delete("picked");
  }

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;

  if (replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
};
