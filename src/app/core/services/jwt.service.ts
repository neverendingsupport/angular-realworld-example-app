import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class JwtService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getToken(): string {
    // localStorage does not exist on the server, so SSR renders as a guest.
    return this.isBrowser ? window.localStorage["jwtToken"] : "";
  }

  saveToken(token: string): void {
    if (!this.isBrowser) return;
    window.localStorage["jwtToken"] = token;
  }

  destroyToken(): void {
    if (!this.isBrowser) return;
    window.localStorage.removeItem("jwtToken");
  }
}
