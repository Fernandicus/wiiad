import { ValidateLoginQueries } from "@/src/domain/ValidateLoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LogInController } from "@/src/controllers/LogInController";
import { IUser } from "@/src/domain/IUser";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { userSession } from "@/src/use-case/container";
import { useEffect, useRef, useState } from "react";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { findAdvertiserHandler } from "@/src/modules/advertiser/advertiser-container";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import {
  IVisitProfile,
  WatchAdController,
} from "@/src/controllers/WatchAdController";
import CreateAdForm from "../../components/profile/CreateAdForm";
import HeaderData from "../../components/profile/HeaderData";
import TotalAds from "../../components/profile/TotalAds";
import AdView from "../../components/watch-ad/AdView";

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const user: IUser = props.user;
  const ads: AdPropsPrimitives[] = props.ads;

  if (props.isViewingAd) {
    return <AdView ads={ads} />;
  }

  return (
    <main>
      <HeaderData user={user} />
      <CreateAdForm user={user} />
      <TotalAds />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryParams = new ValidateLoginQueries(query);

  try {
    if (!queryParams.email || !queryParams.token) {
      const data = await MongoDB.connectAndDisconnect<IVisitProfile>(
        async () => {
          return await WatchAdController.check(context, queryParams);
        }
      );
      return {
        props: data,
      };
    }

    const user = await MongoDB.connectAndDisconnect<IUser | null>(
      async () =>
        await LogInController.initSession(
          {
            email: queryParams.email!,
            token: queryParams.token!,
            userName: queryParams.userName,
          },
          context
        )
    );

    return {
      props: {
        user: { ...user } as IUser,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
