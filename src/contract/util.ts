import { IContractError } from "@/types/contract";

export const DEFAULT_ERROR = "Something went wrong. Please try again later.";

export const UserDeniedMessage =
  "Request rejected. TMRW DAO needs your permission to continue";
export const EventEnded = "The event has ended";
export const AIServerError =
  "The network is currently congested due to the simultaneous generation of numerous images. Please consider trying again later.";
export const TransactionFeeNotEnough =
  "Failed. Please transfer some ELF to this address before you try again.";

export const LoginFailed = "Login failed!";

enum SourceErrorType {
  Error1 = "Operation canceled",
  Error2 = "You closed the prompt without any action",
  Error3 = "User denied",
  Error4 = "User close the prompt",
  Error5 = "Wallet not login",
  Error6 = "Insufficient allowance of ELF",
  Error7 = "User Cancel",
}

export enum TargetErrorType {
  Error1 = UserDeniedMessage,
  Error2 = UserDeniedMessage,
  Error3 = UserDeniedMessage,
  Error4 = UserDeniedMessage,
  Error5 = "Wallet not logged in",
  Error6 = "The allowance you set is less than required. Please reset it",
  Error7 = UserDeniedMessage,
}

export const matchErrorMsg = <T>(message: T) => {
  if (typeof message === "string") {
    const sourceErrors = [
      SourceErrorType.Error1,
      SourceErrorType.Error2,
      SourceErrorType.Error3,
      SourceErrorType.Error4,
      SourceErrorType.Error5,
      SourceErrorType.Error6,
      SourceErrorType.Error7,
    ];
    const targetErrors = [
      TargetErrorType.Error1,
      TargetErrorType.Error2,
      TargetErrorType.Error3,
      TargetErrorType.Error4,
      TargetErrorType.Error5,
      TargetErrorType.Error6,
      TargetErrorType.Error7,
    ];

    let resMessage: string = message;

    for (let index = 0; index < sourceErrors.length; index++) {
      if (message.includes(sourceErrors[index])) {
        resMessage = message.replace(sourceErrors[index], targetErrors[index]);
      }
    }

    return resMessage.replace("AElf.Sdk.CSharp.AssertionException: ", "");
  } else {
    return DEFAULT_ERROR;
  }
};

const stringifyMsg = (message: unknown) => {
  if (typeof message === "object") {
    return JSON.stringify(message);
  }
  return message?.toString();
};
export const formatErrorMsg = (result: IContractError) => {
  let resError: IContractError = result;

  if (result.message) {
    resError = {
      ...result,
      error: result.code,
      errorMessage: {
        message: stringifyMsg(result.message) || "",
      },
    };
  } else if (result.Error) {
    resError = {
      ...result,
      error: "401",
      errorMessage: {
        message:
          stringifyMsg(result.Error)?.replace(
            "AElf.Sdk.CSharp.AssertionException: ",
            ""
          ) || "",
      },
    };
  } else if (
    typeof result.error !== "number" &&
    typeof result.error !== "string"
  ) {
    if (result.error?.message) {
      resError = {
        ...result,
        error: "401",
        errorMessage: {
          message:
            stringifyMsg(result.error.message)?.replace(
              "AElf.Sdk.CSharp.AssertionException: ",
              ""
            ) || "",
        },
      };
    }
  } else if (typeof result.error === "string") {
    resError = {
      ...result,
      error: "401",
      errorMessage: {
        message: result?.errorMessage?.message || result.error,
      },
    };
  }

  const errorMessage = resError.errorMessage?.message;

  return {
    ...resError,
    errorMessage: {
      message: matchErrorMsg(errorMessage),
    },
  };
};
