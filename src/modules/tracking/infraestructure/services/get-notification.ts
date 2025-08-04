import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { NotificationTracking } from "../../domain/entities/notification";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const getNotificationService: TrackingRepository["getNotification"] =
  async () => {
    const response = await api().get("Common/Notification", {
      headers: {
        Authorization: `Bearer ${token()}`,
        //   'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const notification = data.map<NotificationTracking>((not) => ({
      idNotification: not.idNotification,
      idDefendant: not.idDefendant,
      idOfficer: not.idOfficer,
      message: not.message,
      officer: not.officer,
      defendant: not.defendant,
      idStatus: not.idStatus,
      fecAlta: not.fecAlta,
    }));
    return notification;
  };
