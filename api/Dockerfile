FROM ruby:3.2.3

ENV INSTALL_PATH /app
ENV BUNDLE_PATH /gems
ENV GEM_HOME /gems
WORKDIR $INSTALL_PATH
COPY ./Gemfile ./Gemfile.lock $INSTALL_PATH/
RUN gem install bundler -v '2.3.26'
RUN bundle install
COPY . .
CMD bundle exec puma -C config/puma.rb -e development
