// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.jpeg' {
  const value: any;
  export = value;
}

declare module '*.gif' {
  const value: any;
  export = value;
}

declare module '*.webp' {
  const value: any;
  export = value;
}

declare module '*.avif' {
  const value: any;
  export = value;
}

declare module '*.ico' {
  const value: any;
  export = value;
}

declare module '*.bmp' {
  const value: any;
  export = value;
}

declare var mina:
  | {
      requestAccounts: () => Promise<string[]>;
      getAccounts: () => Promise<string[]>;
      on: (event: 'accountsChanged', handler: (event: any) => void) => void;
      request: (any) => Promise<any>;
      isPallad: boolean;
    }
  | undefined;
