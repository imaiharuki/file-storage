import { getCatImage } from "@/lib/getCatImage";

export const navItems = [
  {
    name: "Dashboard",
    url: "/",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheW91dC1kYXNoYm9hcmQiPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHg9IjMiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iNSIgeD0iMTQiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjUiIHg9IjMiIHk9IjE2IiByeD0iMSIvPjwvc3ZnPg==",
  },
  {
    name: "Documents",
    url: "/documents",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtc3RhY2siPjxwYXRoIGQ9Ik0yMSA3aC0zYTIgMiAwIDAgMS0yLTJWMiIvPjxwYXRoIGQ9Ik0yMSA2djYuNWMwIC44LS43IDEuNS0xLjUgMS41aC03Yy0uOCAwLTEuNS0uNy0xLjUtMS41di05YzAtLjguNy0xLjUgMS41LTEuNUgxN1oiLz48cGF0aCBkPSJNNyA4djguOGMwIC4zLjIuNi40LjguMi4yLjUuNC44LjRIMTUiLz48cGF0aCBkPSJNMyAxMnY4LjhjMCAuMy4yLjYuNC44LjIuMi41LjQuOC40SDExIi8+PC9zdmc+",
  },
  {
    name: "Images",
    url: "/images",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtaW1hZ2UiPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN1oiLz48cGF0aCBkPSJNMTQgMnY0YTIgMiAwIDAgMCAyIDJoNCIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTIiIHI9IjIiLz48cGF0aCBkPSJtMjAgMTctMS4yOTYtMS4yOTZhMi40MSAyLjQxIDAgMCAwLTMuNDA4IDBMOSAyMiIvPjwvc3ZnPg==",
  },
  {
    name: "Media",
    url: "/media",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXZpZGVvIj48cGF0aCBkPSJtMTYgMTMgNS4yMjMgMy40ODJhLjUuNSAwIDAgMCAuNzc3LS40MTZWNy44N2EuNS41IDAgMCAwLS43NTItLjQzMkwxNiAxMC41Ii8+PHJlY3QgeD0iMiIgeT0iNiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEyIiByeD0iMiIvPjwvc3ZnPg==",
  },
  {
    name: "Others",
    url: "/others",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVsbGlwc2lzIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMTkiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjUiIGN5PSIxMiIgcj0iMSIvPjwvc3ZnPg==",
  },
];

export const getAvatarPlaceHolderUrl = async () => {
  return await getCatImage();
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
