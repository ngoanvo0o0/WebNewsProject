import { WebsiteRequest, WebsiteResponse } from "../../apis/admin-console"
import { Website } from "../../models/init-models"
import { WebsiteDto } from "../../dtos/website.dto"
import { logHistory } from "./histories.service"
import { HistoryEntityType } from "../../dtos/history.dto"
const host = process.env.HOST || ""

export class AdminConsoleWebsiteService {
  public async getWebsite(): Promise<WebsiteResponse> {
    const websiteModel = await Website.findOne({
      where: {
        isDeleted: false
      },
      order: [
        ['created_at', 'asc']
      ],
      limit: 1
    })

    const result: WebsiteDto = {
      id: websiteModel?.id,
      logo: websiteModel?.logo,
      footerContent: websiteModel?.footerContent,
      facebookUrl: websiteModel?.facebookUrl,
      twitterUrl: websiteModel?.twitterUrl,
      googleUrl: websiteModel?.googleUrl,
      linkedinUrl: websiteModel?.linkedinUrl
    }

    return { data: result }
  }

  public async upsertWebsite(websiteRequest: WebsiteRequest, currentUser: string): Promise<WebsiteResponse> {
    const [website] = await Website.upsert({
      id: websiteRequest.id,
      logo: websiteRequest.logo && `${host}${websiteRequest.logo}`,
      footerContent: websiteRequest.footerContent,
      facebookUrl: websiteRequest.facebookUrl,
      googleUrl: websiteRequest.googleUrl,
      linkedinUrl: websiteRequest.linkedinUrl,
      twitterUrl: websiteRequest.twitterUrl,
      createdBy: !websiteRequest.id ? currentUser: undefined,
      updatedBy: currentUser,
      updatedAt: new Date()
    }, {
      returning: true
    })

    logHistory(currentUser, "update", undefined, undefined, HistoryEntityType.WebsiteContent)

    return {
      data: {
        id: website.id,
        facebookUrl: website.facebookUrl,
        googleUrl: website.googleUrl,
        linkedinUrl: website.linkedinUrl,
        twitterUrl: website.twitterUrl,
        footerContent: website.footerContent,
        logo: website.logo
      }
    }
  }
}
