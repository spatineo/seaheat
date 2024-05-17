import * as cdk from 'aws-cdk-lib'
import { StaticResourcesS3Stack } from '../lib/static-resources-stack'
import { CertificateStack } from '../lib/certificate-stack'

const app = new cdk.App()
const certStack = new CertificateStack(app, 'SeaHeatCertificate', {})
new StaticResourcesS3Stack(app, 'SeaHeatS3', {
  domainName: certStack.domainName,
  certificate: certStack.certificate,
  hostedZone: certStack.hostedZone
})
