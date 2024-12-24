import { Placeholder, AppRoot } from "@telegram-apps/telegram-ui";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useMemo } from "react";

export function EnvUnsupported() {
  const [platform] = useMemo(() => {
    let platform = "base";
    try {
      const lp = retrieveLaunchParams();
      platform = lp.platform;
    } catch {
      /* empty */
    }

    return [platform];
  }, []);

  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(platform) ? "ios" : "base"}
    >
      <Placeholder
        header="Oops"
        className="bg-black"
        description="You are using too old Telegram client to run this application"
      >
        <span>Unsupported environment</span>
      </Placeholder>
    </AppRoot>
  );
}
