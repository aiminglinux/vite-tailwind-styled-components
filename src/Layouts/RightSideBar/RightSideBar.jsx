import tw, { styled } from "twin.macro";

function RightSideBar() {
  return (
    <Wrapper>
      <Card>
        <Header>
          <TagName>#help</TagName>
        </Header>
        <ContentWrapper>
          <Content href="#!">
            Learning Vue - fetching data and re-render
            <ContentFooter>
              <Footer>
                <span>New</span>
              </Footer>
            </ContentFooter>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            Can Anyone Suggest Repositories To Contribute In?
            <ContentFooter>
              <Footer>10 comments</Footer>
            </ContentFooter>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            I'm really confused about myself on computer career. Pls help!
            <ContentFooter>
              <Footer>8 comments</Footer>
            </ContentFooter>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            How do you embed YouTube playlists?
            <ContentFooter>
              <Footer>2 comments</Footer>
            </ContentFooter>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            rbenv on wsl shows ruby version 2.5.0-dev
            <ContentFooter>
              <Footer>
                <span>New</span>
              </Footer>
            </ContentFooter>
          </Content>
        </ContentWrapper>
      </Card>

      <Card>
        <Header>
          <TagName>#programming</TagName>
        </Header>
        <ContentWrapper>
          <Content href="#!">
            Learning Vue - fetching data and re-render
          </Content>
          <ContentFooter>
            <Footer>
              <span>New</span>
            </Footer>
          </ContentFooter>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            Can Anyone Suggest Repositories To Contribute In?
          </Content>
          <ContentFooter isNew>
            <Footer>2 comments</Footer>
          </ContentFooter>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">
            I'm really confused about myself on computer career. Pls help!
          </Content>
          <ContentFooter>
            <Footer>1 comment</Footer>
          </ContentFooter>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">How do you embed YouTube playlists?</Content>
          <ContentFooter>
            <Footer>3 comments</Footer>
          </ContentFooter>
        </ContentWrapper>
        <ContentWrapper>
          <Content href="#!">rbenv on wsl shows ruby version 2.5.0-dev</Content>
          <ContentFooter>
            <Footer>
              <span>New</span>
            </Footer>
          </ContentFooter>
        </ContentWrapper>
      </Card>
    </Wrapper>
  );
}

const Wrapper = tw.aside`hidden lg:block w-full space-y-4`;
const Card = tw.div`border border-solid rounded-md`;
const Header = tw.div`flex p-4 border-b`;
const TagName = tw.h3`text-xl `;
const ContentWrapper = tw.div`p-4 space-y-2 hover:bg-white`;
const Content = tw.a``;
const ContentFooter = tw.div``;
const Footer = styled.div`
  > span {
    ${tw`rounded-md p-1 bg-yellow-200`}
  }
`;

export default RightSideBar;
